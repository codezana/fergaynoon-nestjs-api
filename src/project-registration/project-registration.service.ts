import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectRegistrationDto } from './dto/create-project-registration.dto';
import { UpdateProjectRegistrationDto } from './dto/update-project-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRegistration } from './entities/project-registration.entity';
import { Repository } from 'typeorm';
import { QuizUser } from 'src/quiz-users/entities/quiz-user.entity';
import { Project } from 'src/projects/entities/project.entity';
import { CreateQuizUserDto } from 'src/quiz-users/dto/create-quiz-user.dto';
import { UpdateQuizUserDto } from 'src/quiz-users/dto/update-quiz-user.dto';

@Injectable()
export class ProjectRegistrationService {
  constructor(
    @InjectRepository(ProjectRegistration)
    private readonly registrationRepo: Repository<ProjectRegistration>,

    @InjectRepository(QuizUser)
    private readonly quizUserRepo: Repository<QuizUser>,

    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) { }
  async create(input: CreateProjectRegistrationDto, quizUserInput: CreateQuizUserDto) {
    const project = await this.projectRepo.findOneBy({ id: input.projectId });
    if (!project) {
      throw new NotFoundException('پرۆژەی هەڵبژێراو نەدۆزرایەوە');
    }

    // Step 1: Create the quiz user
    const quizUser = this.quizUserRepo.create({
      name: quizUserInput.name,
      phone: quizUserInput.phone,
      email: quizUserInput.email,
      city: quizUserInput.city,
      ipAddress: quizUserInput.ipAddress,
    });
    const savedQuizUser = await this.quizUserRepo.save(quizUser);

    // Step 2: Register the user to the project
    const registration = this.registrationRepo.create({
      quizUser: savedQuizUser,
      project: project,
    });
    const savedRegistration = await this.registrationRepo.save(registration);

    return {
      message: 'تۆمارکردنی یوزەر بۆ پرۆژە بە سەرکەوتوویی ئەنجامدرا',
      data: savedRegistration,
    };
  }



  async findAll() {
    const list = await this.registrationRepo.find({
      relations: [
        'project',
        'project.projectExam',
        'project.projectExam.projectQuestions',
        'project.projectExam.projectQuestions.projectChoice',
        'quizUser',
        'userAnswers',
        'userAnswers.question',
        'userAnswers.selectedChoice'
      ]
    });
    return list;
  }

  async findOne(id: number) {
    const found = await this.registrationRepo.findOne({
      where: { id },
      relations: [
        'project',
        'project.projectExam',
        'project.projectExam.projectQuestions',
        'project.projectExam.projectQuestions.projectChoice',
        'quizUser',
        'userAnswers',
        'userAnswers.question',
        'userAnswers.selectedChoice'
      ],
    });
    if (!found) {
      throw new NotFoundException('تۆمارکراوی داواکراو نەدۆزرایەوە');
    }
    return found;
  }
  async update(
    registrationId: number,
    input: UpdateProjectRegistrationDto,
    quizUserInput: UpdateQuizUserDto
  ) {
    const registration = await this.registrationRepo.findOne({
      where: { id: registrationId },
      relations: ['quizUser', 'project'],
    });

    if (!registration) {
      throw new NotFoundException('تۆمارکردن نەدۆزرایەوە');
    }

    const project = await this.projectRepo.findOneBy({ id: input.projectId });
    if (!project) {
      throw new NotFoundException('پرۆژەی نوێ نەدۆزرایەوە');
    }

    // Update the quiz user info
    const quizUser = registration.quizUser;
    quizUser.name = quizUserInput.name ?? quizUser.name;
    quizUser.phone = quizUserInput.phone ?? quizUser.phone;
    quizUser.email = quizUserInput.email ?? quizUser.email;
    quizUser.city = quizUserInput.city ?? quizUser.city;
    quizUser.ipAddress = quizUserInput.ipAddress ?? quizUser.ipAddress;
    
    await this.quizUserRepo.save(quizUser);

    // Update the project if changed
    registration.project = project;
    const updatedRegistration = await this.registrationRepo.save(registration);

    return {
      message: 'نوێکردنەوەی تۆمارکردن بە سەرکەوتوویی ئەنجامدرا',
      data: updatedRegistration,
    };
  }


  async remove(id: number) {
    const registration = await this.registrationRepo.findOne({
      where: { id },
      relations: ['quizUser'],
    });
  
    if (!registration) {
      throw new NotFoundException('تۆمارکراوی داواکراو نەدۆزرایەوە');
    }
  
    const quizUser = registration.quizUser;
  
    // First, remove the registration
    await this.registrationRepo.remove(registration);
  
    // Then, check if the user has any more registrations
    const otherRegs = await this.registrationRepo.count({
      where: { quizUser: { id: quizUser.id } },
    });
  
    if (otherRegs === 0) {
      await this.quizUserRepo.remove(quizUser);
    }
  
    return {
      message: 'تۆمارکراو سڕایەوە، و یوزەری گرێدراو هەروەها سڕایەوە چونکە هیچ تۆماری تر نیە',
    };
  }
  

}
