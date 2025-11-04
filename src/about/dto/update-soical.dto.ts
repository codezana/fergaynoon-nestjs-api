import {CreateSocialMediaDto } from './create-soical.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSocialMediaDto extends PartialType(CreateSocialMediaDto) {}
