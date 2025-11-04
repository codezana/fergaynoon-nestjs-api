import { ArrayMinSize, IsArray, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { CreateProjectChoiceDto } from "./create-project-choice.dto";
import { Type } from "class-transformer";
import { CreateChoiceDto } from "src/questions/dto/create-choice.dto";

export class CreateProjectQuestionDto {
  @IsOptional()
  @IsString()
  title: string | null;

  @IsOptional()
  @IsNumber()
  degree: number | null;

  @IsNumber()
  projectExamId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProjectChoiceDto)
  choices: CreateProjectChoiceDto[];
}
