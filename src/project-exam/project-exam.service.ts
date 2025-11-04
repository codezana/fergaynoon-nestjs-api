import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectExamDto } from './dto/create-project-exam.dto';
import { UpdateProjectExamDto } from './dto/update-project-exam.dto';
import { ProjectQuestion } from 'src/project-question/entities/project-question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectExam } from './entities/project-exam.entity';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class ProjectExamService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(ProjectExam)
    private ProjectExamRepository: Repository<ProjectExam>,
    @InjectRepository(ProjectQuestion)
    private questionRepository: Repository<ProjectQuestion>,
  ) { }

  async create(input: CreateProjectExamDto) {
    // 1. Find the projectExam
    const project = await this.projectRepository.findOne({ where: { id: input.projectId } });
    if (!project) {
      throw new NotFoundException(`پڕۆژەی داواکراو نەدۆزرایەوە`);
    }

    // 2. Create the projectExam and assign the relation
    const projectExam = this.ProjectExamRepository.create({
      title: input.title,
      description: input.description,
      total_degree: input.total_degree,
      isActive: input.isActive,
      project,
    });


    // 3. Save and return
   const saved= await this.ProjectExamRepository.save(projectExam);

    return {
      message: 'تاقیکردنەوە بە سەرکەوتوویی دروستکرا',
      data: saved, 
    }
  }

  async findAll() {
    const question = await this.ProjectExamRepository.find({
      relations: ['project', 'projectQuestions', 'projectQuestions.projectChoice']
    });
    return question;
  }

  async findOne(id: number) {
    const question = await this.ProjectExamRepository.findOne({
      where: {
        id: id
      },
      relations: ['project', 'projectQuestions', 'projectQuestions.projectChoice'],
    });
    if (!question) {
      throw new NotFoundException(`تاقیکردنەوەی داواکراو نەدۆزرایەوە`);
    }
    return question;
  }

  async update(id: number, updateProjectExamInput: UpdateProjectExamDto) {
    // Find the existing projectExam
    const projectExam = await this.findOne(id);
    
    // Update the projectExam with the provided input
    Object.assign(projectExam, updateProjectExamInput);
  
    // If projectId is updated and you want to update the associated Project in the projectExam:
    if (updateProjectExamInput.projectId && updateProjectExamInput.projectId !== projectExam.project?.id) {
      // Find the new Project based on the projectId
      const newProject = await this.projectRepository.findOne({ where: { id: updateProjectExamInput.projectId } });
      
      if (!newProject) {
        throw new NotFoundException('پڕۆژەی داواکراو نەدۆزرایەوە');
      }
      
      // Update the Project relation in the question entity
      projectExam.project = newProject;
    }
  
    // Save the updated question entity
    const saved = await this.ProjectExamRepository.save(projectExam);
  
    return {
      message: 'تاقیکردنەوە بە سەرکەوتوویی نوێکرایەوە',
      data: saved,
    };
  }
  
  async remove(id: number) {
    const questionfind = await this.findOne(id);
    const question = await this.questionRepository.count({ where: { projectExam: { id } } });
  
    if (question > 0) {
      return {
        message: 'ناتوانرێت ئەم تاقیکردنەوەیە بسڕدرێت چونکە پرسیارەکان لەسەر ئەوە دروستکراون'
      };
    }
  
    await this.ProjectExamRepository.remove(questionfind);
    return {
      message: 'تاقیکردنەوە بە سەرکەوتوویی سڕایەوە'
    };
  }
}
