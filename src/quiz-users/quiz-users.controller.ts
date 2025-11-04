import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { QuizUsersService } from './quiz-users.service';
import { CreateQuizUserDto } from './dto/create-quiz-user.dto';
import { UpdateQuizUserDto } from './dto/update-quiz-user.dto';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@Controller('quiz-users')
export class QuizUsersController {
  constructor(private readonly quizUsersService: QuizUsersService) {}
}
