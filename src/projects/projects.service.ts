import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) { }

  async create(
    createProjectDto: CreateProjectDto,
    imageFile?: Express.Multer.File,
  ) {
    // Handle image upload if exists
    if (imageFile) {
      // Validate image
      if (!imageFile.mimetype.startsWith('image/')) {
        throw new BadRequestException('تەنها فایلی وێنە ڕێگەپێدراوە');
      }

      // Create unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(imageFile.originalname);
      const filename = `${uniqueSuffix}${ext}`;
      const uploadPath = path.join(__dirname, '..', '..', 'uploads', filename);

      // Ensure uploads directory exists
      if (!fs.existsSync(path.dirname(uploadPath))) {
        fs.mkdirSync(path.dirname(uploadPath), { recursive: true });
      }

      // Save file
      fs.writeFileSync(uploadPath, imageFile.buffer);

      // Set image path in DTO
      createProjectDto.imagePath = `/uploads/${filename}`;
    }

    // Create and save project
    const project = this.projectRepository.create(createProjectDto);
    const savedProject = await this.projectRepository.save(project);

    return {
      message: 'پڕۆژە بە سەرکەوتوویی دروستکرا',
      data: savedProject,
    };
  }

  async findAll() {
    return this.projectRepository.find({
      relations:[
        'projectExam',
        'projectExam.projectQuestions',
        'projectExam.projectQuestions.projectChoice',
      ]
    });
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations:[
        'projectExam',
        'projectExam.projectQuestions',
        'projectExam.projectQuestions.projectChoice',
      ]
    });
    if (!project) {
      throw new NotFoundException(`پڕۆژەی داواکراو نەدۆزرایەوە`);
    }
    return project;
  }

  async update(
    id: number,
    input: UpdateProjectDto,
    imageFile?: Express.Multer.File,
  ) {
    const project = await this.findOne(id);
  
    // If a new image is uploaded
    if (imageFile) {
      if (!imageFile.mimetype.startsWith('image/')) {
        throw new BadRequestException('تەنها فایلی وێنە ڕێگەپێدراوە');
      }
  
      // Delete old image
      if (project.imagePath) {
        const oldImagePath = path.join(__dirname, '..', '..', project.imagePath);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
  
      // Save new image
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(imageFile.originalname);
      const filename = `${uniqueSuffix}${ext}`;
      const uploadPath = path.join(__dirname, '..', '..', 'uploads', filename);
  
      if (!fs.existsSync(path.dirname(uploadPath))) {
        fs.mkdirSync(path.dirname(uploadPath), { recursive: true });
      }
  
      fs.writeFileSync(uploadPath, imageFile.buffer);
      input.imagePath = `/uploads/${filename}`;
    }
  
    Object.assign(project, input);
    const saved = await this.projectRepository.save(project);
  
    return {
      message: 'پڕۆژە بە سەرکەوتوویی نوێکرایەوە',
      data: saved,
    };
  }
  

  async remove(id: number) {
    const project = await this.findOne(id);
  
    // Delete image file
    if (project.imagePath) {
      const imagePath = path.join(__dirname, '..', '..', project.imagePath);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
  
    await this.projectRepository.remove(project);
    return {
      message: 'پڕۆژە بە سەرکەوتوویی سڕایەوە',
    };
  }
  
}
