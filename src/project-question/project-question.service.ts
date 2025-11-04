import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectQuestionDto } from './dto/create-project-question.dto';
import { UpdateProjectQuestionDto } from './dto/update-project-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectQuestion } from './entities/project-question.entity';
import { ProjectChoice } from './entities/project-choice.entity';
import { QueryRunner, Repository } from 'typeorm';
import { ProjectExam } from 'src/project-exam/entities/project-exam.entity';
import { CreateProjectChoiceDto } from './dto/create-project-choice.dto';

@Injectable()
export class ProjectQuestionService {
  constructor(
    @InjectRepository(ProjectQuestion)
    private readonly projectQuestionRepository: Repository<ProjectQuestion>,
    @InjectRepository(ProjectChoice)
    private readonly projectChoiceRepository: Repository<ProjectChoice>,
    @InjectRepository(ProjectExam)
    private readonly projectExamRepository: Repository<ProjectExam>,
  ) { }


  async createWithChoices(input: CreateProjectQuestionDto) {
    const queryRunner = this.projectQuestionRepository.manager.connection.createQueryRunner();

    // Start a transaction
    await queryRunner.startTransaction();
    try {
      const exam = await this.projectExamRepository.findOne({ where: { id: input.projectExamId } });
      if (!exam) throw new NotFoundException('تاقیکردنەوەکە نەدۆزرایەوە');
      // Step 1: Create Project Question
      const question = this.projectQuestionRepository.create({
        projectExam: exam,
        title: input.title ?? undefined,
        degree: input.degree ?? undefined,
      });
      
      const savedQuestion = await queryRunner.manager.save(ProjectQuestion, question);

      if (!savedQuestion.id) {
        throw new Error("دروستکردنی پرسیارەکە سەرکەوتوو نەبوو. هیچ ئایدیەک نەگەڕایەوە");
      }

      // Step 2: Create Project Choices associated with the question
      const choices = input.choices.map((choiceInput: CreateProjectChoiceDto) => {
        const choice = this.projectChoiceRepository.create({
          choiceKey: choiceInput.choiceKey ?? undefined,
          choiceText: choiceInput.choiceText ?? undefined,
          isCorrect: choiceInput.isCorrect ?? undefined,
          projectQuestion: savedQuestion,
        });
        return choice;
      });

      await queryRunner.manager.save(ProjectChoice, choices);

      const fullQuestion = await queryRunner.manager.findOne(ProjectQuestion, {
        where: { id: savedQuestion.id },
        relations: ['projectChoice'],
      });

      // Commit the transaction
      await queryRunner.commitTransaction();

      return {
        message: 'پرسیار و هەڵبژاردنەکان بە سەرکەوتوویی دروستکراون',
        data: fullQuestion
      };
    } catch (error) {
      // Rollback if an error occurs
      await queryRunner.rollbackTransaction();
      throw error; // Rethrow error to be handled in the resolver
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const questions = await this.projectQuestionRepository.find({
      relations: ['projectChoice']
    });

    return questions;
  }

  async findOne(id: number) {
    const question = await this.projectQuestionRepository.findOne({
      where: { id },
      relations: ['projectChoice']
    });

    if (!question) {
      throw new NotFoundException(`پرسیارەکە نەدۆزرایەوە`);
    }

    return question;
  }

  async updateWithChoices(id: number, input: UpdateProjectQuestionDto) {
    const queryRunner = this.projectQuestionRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingQuestion = await this.findQuestionOrFail(queryRunner, id);
      await this.updateQuestionFields(existingQuestion, input);
      const updatedQuestion = await queryRunner.manager.save(ProjectQuestion, existingQuestion);

      if (input.choices) {
        await this.replaceChoices(queryRunner, updatedQuestion, input.choices);
      }

      const reloadedQuestion = await this.projectQuestionRepository.findOne({
        where: { id },
        relations: ['projectChoice'],
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

  private async findQuestionOrFail(queryRunner: QueryRunner, id: number){
    const question = await queryRunner.manager.findOne(ProjectQuestion, {
      where: { id },
      relations: ['projectChoice'],
    });
    if (!question) throw new NotFoundException('پرسیارەکە نەدۆزرایەوە');
    return question;
  }

  private async updateQuestionFields(question: ProjectQuestion, input: UpdateProjectQuestionDto) {
    if (input.title !== undefined) {
      question.title = input.title ?? '';
    }

    if (input.degree !== undefined) {
      question.degree = input.degree ?? 0; // Provide default value of 0 if input.degree is null
    }

    if (input.projectExamId !== undefined) {
      const projectExam = await this.projectExamRepository.findOne({ where: { id: input.projectExamId } });
      if (!projectExam) throw new NotFoundException('تاقیکردنەوەکە نەدۆزرایەوە');
      question.projectExam = projectExam;
    }
  }

  private async replaceChoices(queryRunner: QueryRunner, question: ProjectQuestion, choices: CreateProjectChoiceDto[]) {
    await queryRunner.manager.delete(ProjectChoice, { projectQuestion: question });

    const newChoices = choices.map(choice =>
      this.projectChoiceRepository.create({ 
        choiceKey: choice.choiceKey ?? undefined,
        choiceText: choice.choiceText ?? undefined,
        isCorrect: choice.isCorrect ?? undefined,
        projectQuestion: question })
    );

    await queryRunner.manager.save(ProjectChoice, newChoices);
  }



  async removeWithChoices(id: number) {
    const queryRunner = this.projectQuestionRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
  
    try {
      const existingQuestion = await queryRunner.manager.findOne(ProjectQuestion, {
        where: { id },
        relations: ['projectChoice'],
      });
  
      if (!existingQuestion) {
        throw new NotFoundException(`پرسیارەکە نەدۆزرایەوە`);
      }
  
      // Remove choices first
      if (existingQuestion.projectChoice?.length > 0) {
        await queryRunner.manager.remove(ProjectChoice, existingQuestion.projectChoice);
      }
  
      // Then remove the question
      await queryRunner.manager.remove(ProjectQuestion, existingQuestion);
  
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
    const choice = await this.projectChoiceRepository.findOne({ where: { id: choiceId } });
  
    if (!choice) {
      throw new NotFoundException('هەڵبژاردنەکە نەدۆزرایەوە');
    }
  
    await this.projectChoiceRepository.remove(choice);
  
    return {
      message: 'هەڵبژاردنەکە بە سەرکەوتوویی سڕایەوە',
    };
  }
  
  
}
