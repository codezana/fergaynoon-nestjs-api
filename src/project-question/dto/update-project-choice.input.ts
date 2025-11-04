import { CreateProjectChoiceDto } from './create-project-choice.dto';
import { InputType,PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectChoiceInput extends PartialType(CreateProjectChoiceDto) {}
