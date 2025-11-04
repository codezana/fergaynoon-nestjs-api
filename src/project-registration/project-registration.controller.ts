import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProjectRegistrationService } from './project-registration.service';
import { CreateProjectRegistrationDto } from './dto/create-project-registration.dto';
import { UpdateProjectRegistrationDto } from './dto/update-project-registration.dto';
import { CreateQuizUserDto } from 'src/quiz-users/dto/create-quiz-user.dto';
import { Throttle } from '@nestjs/throttler';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/roles.guard';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';
import { UpdateQuizUserDto } from 'src/quiz-users/dto/update-quiz-user.dto';

@Controller('project-registration')
export class ProjectRegistrationController {
  constructor(private readonly projectRegistrationService: ProjectRegistrationService) {}

  @Throttle({ default: { ttl: 60, limit: 5 } })
  @Post()
  async create(@Body() body: { 
    ProjectRegistration: CreateProjectRegistrationDto, 
    createQuizUser: CreateQuizUserDto 
  }) {
    try {
      const result = await this.projectRegistrationService.create(
        body.ProjectRegistration,
        body.createQuizUser
      );
      return {
        message: result.message,
        data: result.data
      };
    } catch (error) {
      return {
        message:error.message,
      };
    }
  }
  

  
  @Get()
  async findAll() {
      return await this.projectRegistrationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number) {
      return await this.projectRegistrationService.findOne(id);
  }

  @Throttle({ default: { ttl: 60, limit: 5 } })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async updateRegistration(
    @Param('id', ParseIntPipe) id: number,
    @Body('input') input: UpdateProjectRegistrationDto,
    @Body('quizUserInput') quizUserInput: UpdateQuizUserDto
  ) {
    try {
      const result = await this.projectRegistrationService.update(id, input,quizUserInput);
      return {
        message: result.message,
        data: result.data
      };
    } catch (error) {
      return {
        message:  error.message,
      };
    }
  }

  @Throttle({ default: { ttl: 60, limit: 5 } })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.projectRegistrationService.remove(+id);
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
