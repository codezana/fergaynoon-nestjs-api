import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectExam } from 'src/project-exam/entities/project-exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project,ProjectExam])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
