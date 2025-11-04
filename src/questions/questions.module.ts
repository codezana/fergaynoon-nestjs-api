import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { ChoicesModule } from './choices.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Choice } from './entities/choice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Level, Choice]),
  ChoicesModule
],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
