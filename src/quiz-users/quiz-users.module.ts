import { Module } from '@nestjs/common';
import { QuizUsersService } from './quiz-users.service';
import { QuizUsersController } from './quiz-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizUser } from './entities/quiz-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizUser])],
  controllers: [QuizUsersController],
  providers: [QuizUsersService],
})
export class QuizUsersModule {}
