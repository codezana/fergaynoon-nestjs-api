import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizUserDto } from './create-quiz-user.dto';

export class UpdateQuizUserDto extends PartialType(CreateQuizUserDto) {}
