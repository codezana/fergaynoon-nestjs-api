import { Module } from '@nestjs/common';
import { ProjectExamService } from './project-exam.service';
import { ProjectExamController } from './project-exam.controller';
import { Project } from 'src/projects/entities/project.entity';
import { ProjectExam } from './entities/project-exam.entity';
import { ProjectQuestion } from 'src/project-question/entities/project-question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Project,ProjectExam,ProjectQuestion])],
  controllers: [ProjectExamController],
  providers: [ProjectExamService],
})
export class ProjectExamModule {}
