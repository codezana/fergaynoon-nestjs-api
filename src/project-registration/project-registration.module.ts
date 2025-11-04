import { Module } from '@nestjs/common';
import { ProjectRegistrationService } from './project-registration.service';
import { ProjectRegistrationController } from './project-registration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { QuizUser } from 'src/quiz-users/entities/quiz-user.entity';
import { ProjectRegistration } from './entities/project-registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project,QuizUser,ProjectRegistration])],
  controllers: [ProjectRegistrationController],
  providers: [ProjectRegistrationService],
})
export class ProjectRegistrationModule {}
