import { IsOptional, IsString, Length, IsBoolean } from 'class-validator';

export class CreateProjectChoiceDto {
  @IsOptional()
  @IsString()
  @Length(1, 1, { message: 'choiceKey must be exactly one character' })
  choiceKey?: string | null;

  @IsOptional()
  @IsString()
  choiceText?: string | null;

  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean | null;
}
