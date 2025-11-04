import { Module } from '@nestjs/common';
import { ProjectUserAnswerService } from './project-user-answer.service';
import { ProjectUserAnswerController } from './project-user-answer.controller';
import { ProjectUserAnswer } from './entities/project-user-answer.entity';
import { ProjectRegistration } from 'src/project-registration/entities/project-registration.entity';
import { ProjectQuestion } from 'src/project-question/entities/project-question.entity';
import { ProjectChoice } from 'src/project-question/entities/project-choice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectUserAnswer,ProjectRegistration,ProjectQuestion,ProjectChoice])],
  controllers: [ProjectUserAnswerController],
  providers: [ProjectUserAnswerService],
})
export class ProjectUserAnswerModule {}
