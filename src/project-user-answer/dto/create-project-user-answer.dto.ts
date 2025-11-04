import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateProjectUserAnswerDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  registrationId: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  questionId: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  selectedChoiceId: number;

}
