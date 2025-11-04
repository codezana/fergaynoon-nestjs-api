import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProjectQuestionService } from './project-question.service';
import { CreateProjectQuestionDto } from './dto/create-project-question.dto';
import { UpdateProjectQuestionDto } from './dto/update-project-question.dto';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@Controller('project-question')
export class ProjectQuestionController {
  constructor(private readonly projectQuestionService: ProjectQuestionService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() createProjectQuestionDto: CreateProjectQuestionDto) {
    try {
      const result = await this.projectQuestionService.createWithChoices(createProjectQuestionDto);
      return {
        message: result.message,
        data: result.data,
      };
    } catch (error) {
      return {
        message:  error.message,
      };
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll() {
    return this.projectQuestionService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.projectQuestionService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(
    @Param('id',ParseIntPipe) id: number,
    @Body() updateProjectQuestionDto: UpdateProjectQuestionDto,
  ) {
    try {
      const result = await this.projectQuestionService.updateWithChoices(id, updateProjectQuestionDto);
      return {
        message: result.message,
      };
    } catch (error) {
      return {
        status: 500,
        message:error.message,
      };
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id',ParseIntPipe) id: number) {
    try {
      const result = await this.projectQuestionService.removeWithChoices(id);
      return {
        message: result.message,
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  
  @Delete('project-choice/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async removeChoice(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.projectQuestionService.removeChoice(id);
      return { message: result.message };
    } catch (error) {
      return {
        message:error.message,
      };
    }
  }
}
