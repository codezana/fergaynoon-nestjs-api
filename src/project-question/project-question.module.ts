import { Module } from '@nestjs/common';
import { ProjectQuestionService } from './project-question.service';
import { ProjectQuestionController } from './project-question.controller';
import { ProjectChoiceModule } from './project-choice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectQuestion } from './entities/project-question.entity';
import { ProjectChoice } from './entities/project-choice.entity';
import { ProjectExam } from 'src/project-exam/entities/project-exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectQuestion, ProjectChoice,ProjectExam]),
  ProjectChoiceModule
],
  controllers: [ProjectQuestionController],
  providers: [ProjectQuestionService],
})
export class ProjectQuestionModule {}
