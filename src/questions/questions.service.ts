import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Choice } from './entities/choice.entity';
import { Level } from 'src/levels/entities/level.entity';
import { QueryRunner, Repository } from 'typeorm';
import { CreateChoiceDto } from './dto/create-choice.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Choice)
    private readonly choiceRepository: Repository<Choice>,
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) { }


  async createWithChoices(input: CreateQuestionDto) {
    return this.questionRepository.manager.transaction(async manager => {
      const level = await manager.findOne(Level, { where: { id: input.levelId } });
      if (!level) throw new NotFoundException('ئاستەکە نەدۆزرایەوە');
  
      // pull out 'choices' so it doesn't get spread into the Question
      const { choices: choiceInputs, ...qData } = input;
  
      // create just the question
      const question = manager.create(Question, {
        ...qData,
        level,
      });
      const savedQuestion = await manager.save(question);
  
      // now insert the four choices exactly once
      const choices = choiceInputs.map(c =>
        manager.create(Choice, { ...c, question: savedQuestion })
      );
      await manager.save(choices);
  
      const fullQuestion = await manager.findOne(Question, {
        where: { id: savedQuestion.id },
        relations: ['choices'],
      });
  
      return {
        message: 'پرسیار و هەڵبژاردنەکان بە سەرکەوتوویی دروستکراون',
        data: fullQuestion,
      };
    });
  }
  
  

  async findAll() {
    const questions = await this.questionRepository.find({
      relations: ['choices']
    });

    return questions;
  }

  async findOne(id: number) {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['choices']
    });

    if (!question) {
      throw new NotFoundException(`پرسیارەکە نەدۆزرایەوە`);
    }

    return question;
  }

  async updateWithChoices(id: number, input: UpdateQuestionDto) {
    const queryRunner = this.questionRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingQuestion = await this.findQuestionOrFail(queryRunner, id);
      await this.updateQuestionFields(existingQuestion, input);
      const updatedQuestion = await queryRunner.manager.save(Question, existingQuestion);

      if (input.choices) {
        await this.replaceChoices(queryRunner, updatedQuestion, input.choices);
      }

      const reloadedQuestion = await this.questionRepository.findOne({
        where: { id },
        relations: ['choices'],
      });

      if (!reloadedQuestion) throw new NotFoundException('نوێکردنەوەی پرسیار سەرکەوتوو نەبوو');

      await queryRunner.commitTransaction();

      return {
        message: 'پرسیار و هەڵبژاردنەکان بە سەرکەوتوویی نوێکرانەوە',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async findQuestionOrFail(queryRunner: QueryRunner, id: number): Promise<Question> {
    const question = await queryRunner.manager.findOne(Question, {
      where: { id },
      relations: ['choices'],
    });
    if (!question) throw new NotFoundException('پرسیارەکە نەدۆزرایەوە');
    return question;
  }

  private async updateQuestionFields(question: Question, input: UpdateQuestionDto) {
    if (input.title !== undefined) {
      question.title = input.title;
    }

    if (input.degree !== undefined) {
      question.degree = input.degree;
    }

    if (input.levelId !== undefined) {
      const level = await this.levelRepository.findOne({ where: { id: input.levelId } });
      if (!level) throw new NotFoundException('ئاستەکە نەدۆزرایەوە');
      question.level = level;
    }
  }

  private async replaceChoices(queryRunner: QueryRunner, question: Question, choices: CreateChoiceDto[]) {
    await queryRunner.manager.delete(Choice, { question });

    const newChoices = choices.map(choice =>
      this.choiceRepository.create({ ...choice, question })
    );

    await queryRunner.manager.save(Choice, newChoices);
  }



  async removeWithChoices(id: number) {
    const queryRunner = this.questionRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
  
    try {
      const existingQuestion = await queryRunner.manager.findOne(Question, {
        where: { id },
        relations: ['choices'],
      });
  
      if (!existingQuestion) {
        throw new NotFoundException(`پرسیارەکە نەدۆزرایەوە`);
      }
  
      // Remove choices first
      if (existingQuestion.choices?.length > 0) {
        await queryRunner.manager.remove(Choice, existingQuestion.choices);
      }
  
      // Then remove the question
      await queryRunner.manager.remove(Question, existingQuestion);
  
      await queryRunner.commitTransaction();
  
      return {
        message: 'پرسیار و هەڵبژاردنەکان بە سەرکەوتوویی سڕانەوە',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }


  async removeChoice(choiceId: number) {
    const choice = await this.choiceRepository.findOne({ where: { id: choiceId } });
  
    if (!choice) {
      throw new NotFoundException('هەڵبژاردنەکە نەدۆزرایەوە');
    }
  
    await this.choiceRepository.remove(choice);
  
    return {
      message: 'هەڵبژاردنەکە بە سەرکەوتوویی سڕایەوە',
    };
  }
  
  
}
