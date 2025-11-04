import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectExamDto } from './create-project-exam.dto';

export class UpdateProjectExamDto extends PartialType(CreateProjectExamDto) {}
