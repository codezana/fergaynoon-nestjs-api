import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProjectExamService } from './project-exam.service';
import { CreateProjectExamDto } from './dto/create-project-exam.dto';
import { UpdateProjectExamDto } from './dto/update-project-exam.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@Controller('project-exam')
export class ProjectExamController {
  constructor(private readonly projectExamService: ProjectExamService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll() {
    return this.projectExamService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.projectExamService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() createProjectExamDto: CreateProjectExamDto) {
    try {
      const result = await this.projectExamService.create(createProjectExamDto);
      return {
        message: result.message,
        data: result.data,
      };
    } catch (error) {
      return {
        message:error.message,
      };
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateProjectExamDto: UpdateProjectExamDto) {
    try {
      const result = await this.projectExamService.update(id, updateProjectExamDto);
      return {
        message: result.message,
        data: result.data
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id',ParseIntPipe) id: number) {
    try {
      const result = await this.projectExamService.remove(id);
      return {
        message: result.message
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }
}
