import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectQuestionDto } from './create-project-question.dto';

export class UpdateProjectQuestionDto extends PartialType(CreateProjectQuestionDto) {}
