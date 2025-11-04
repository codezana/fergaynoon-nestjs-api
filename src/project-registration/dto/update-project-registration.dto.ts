import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectRegistrationDto } from './create-project-registration.dto';

export class UpdateProjectRegistrationDto extends PartialType(CreateProjectRegistrationDto) {}
