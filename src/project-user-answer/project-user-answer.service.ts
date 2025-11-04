import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectUserAnswerDto } from './dto/create-project-user-answer.dto';
import { UpdateProjectUserAnswerDto } from './dto/update-project-user-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectQuestion } from 'src/project-question/entities/project-question.entity';
import { ProjectRegistration } from 'src/project-registration/entities/project-registration.entity';
import { ProjectUserAnswer } from './entities/project-user-answer.entity';
import { ProjectChoice } from 'src/project-question/entities/project-choice.entity';

@Injectable()
export class ProjectUserAnswerService {

  constructor(
    @InjectRepository(ProjectUserAnswer)
    private readonly answerRepo: Repository<ProjectUserAnswer>,

    @InjectRepository(ProjectRegistration)
    private readonly registrationRepo: Repository<ProjectRegistration>,

    @InjectRepository(ProjectQuestion)
    private readonly questionRepo: Repository<ProjectQuestion>,

    @InjectRepository(ProjectChoice)
    private readonly choiceRepo: Repository<ProjectChoice>,
  ) { }

  async create(createAnswerInput: CreateProjectUserAnswerDto) {
    const { registrationId, questionId, selectedChoiceId } = createAnswerInput;

    // 1. Check if already answered
    const alreadyAnswered = await this.answerRepo.findOne({
      where: {
        registration: { id: registrationId },
        question: { id: questionId },
      },
    });

    if (alreadyAnswered) {
      throw new Error('ئەم پرسیارە پێشتر وەڵام دراوە');
    }

    // 2. Fetch related entities
    const registration = await this.registrationRepo.findOne({
      where: { id: registrationId },
      relations: ['project.projectExam'],
    });
    if (!registration) {
      throw new Error('تۆمارکردن نەدۆزرایەوە');
    }

    const question = await this.questionRepo.findOneByOrFail({ id: questionId });
    const choice = await this.choiceRepo.findOneByOrFail({ id: selectedChoiceId });

    const isCorrect = choice.isCorrect === true;

    // 3. Create the answer
    const newAnswer = this.answerRepo.create({
      registration,
      question,
      selectedChoice: choice,
      isCorrect,
    });

    await this.answerRepo.save(newAnswer);

    // 4. Recalculate score from all answers
    const userAnswers = await this.answerRepo.find({
      where: { registration: { id: registration.id } },
      relations: ['question'],
    });

    let score = 0;
    for (const answer of userAnswers) {
      if (answer.isCorrect) {
        score += answer.question.degree ?? 0;
      }
    }

    const maxScore = registration.project?.projectExam?.[0]?.total_degree ?? 100;
    if (score > maxScore) {
      score = maxScore;
    }

    await this.registrationRepo.update(registration.id, { totalScore: score });

    return {
      message: 'وەڵام بە سەرکەوتوویی دروستکرا',
      data: newAnswer,
    };
  }



  async findAll() {
    const findall = await this.answerRepo.find({ relations: ['registration', 'question', 'selectedChoice'] });
    return findall;
  }

  async findOne(id: number) {
    const userAnswers = await this.answerRepo.findOne({
      where: { id },
      relations: ['registration', 'question', 'selectedChoice'],
    });
    if (!userAnswers) {
      throw new NotFoundException('وەڵام نەدۆزرایەوە');
    }
    return userAnswers;
  }
}
