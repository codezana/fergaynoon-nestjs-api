import { IsString, IsNotEmpty, Min, IsArray, IsNumber, ValidateNested, ArrayMinSize } from 'class-validator';
import { CreateChoiceDto } from './create-choice.dto';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
  @IsString({ message: 'تکایە دەبێت ناونیشان نووسراو بێت' })
  @IsNotEmpty({ message: 'تکایە ناونیشان بەتاڵ نەبێت' })
  title: string;

  @Min(1)
  levelId?: number;

  @ValidateNested({ each: true })
  @Type(() => CreateChoiceDto)
  @ArrayMinSize(2, { message: 'بە پەیوەندیدا دەبێت لانی کەم دوو هەڵبژاردن بێت' })
  choices: CreateChoiceDto[];

  @IsNumber()
  degree: number;
}
