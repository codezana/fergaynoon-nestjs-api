import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectUserAnswerDto } from './create-project-user-answer.dto';

export class UpdateProjectUserAnswerDto extends PartialType(CreateProjectUserAnswerDto) {}
