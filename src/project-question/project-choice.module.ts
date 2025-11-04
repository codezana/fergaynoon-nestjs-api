import { Module } from '@nestjs/common';
import { ProjectChoice } from './entities/project-choice.entity';

@Module({
  imports: [ProjectChoice],
  providers: [],
})
export class ProjectChoiceModule {}
