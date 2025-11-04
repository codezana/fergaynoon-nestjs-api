import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    try {
      const result = await this.questionsService.createWithChoices(createQuestionDto);
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

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateQuestionDto: UpdateQuestionDto) {
    try {
      const result = await this.questionsService.updateWithChoices(id, updateQuestionDto);
      return {
        message: result.message
      };
    } catch (error) {
      return {
        message:error.message,
      };
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.questionsService.removeWithChoices(id);
      return {
        message: result.message
      };
    } catch (error) {
      return {
        message:error.message,
      };
    }
  }


  @Delete('choice/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async removeChoice(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.questionsService.removeChoice(id);
      return { message: result.message };
    } catch (error) {
      return {
        message:error.message,
      };
    }
  }

}
