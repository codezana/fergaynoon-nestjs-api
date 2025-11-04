import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateQuizUserDto } from './dto/update-quiz-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizUser } from './entities/quiz-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizUsersService {
  constructor(
    @InjectRepository(QuizUser)
    private readonly quizRepository: Repository<QuizUser>,
  ) { }
}
