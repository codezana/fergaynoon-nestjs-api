import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectUserAnswerService } from './project-user-answer.service';
import { CreateProjectUserAnswerDto } from './dto/create-project-user-answer.dto';
import { UpdateProjectUserAnswerDto } from './dto/update-project-user-answer.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@Controller('project-user-answer')
export class ProjectUserAnswerController {
  constructor(private readonly projectUserAnswerService: ProjectUserAnswerService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async createProjectUserAnswer(@Body() createProjectUserAnswerDto: CreateProjectUserAnswerDto) {
    try {
      const result = await this.projectUserAnswerService.create(createProjectUserAnswerDto);

      return {
        message: result.message,
        data: result.data
      }
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findAll() {
    return this.projectUserAnswerService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findOne(@Param('id') id: number) {
    return this.projectUserAnswerService.findOne(id);
  }
}
