import { IsBoolean, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';


export class CreateProjectExamDto {
  @IsString({ message: 'تکایە دەبێت نووسین بێت' }) // Must be string
  @IsNotEmpty({ message: 'تکایە نابێت بەتاڵ بێت' }) // Must not be empty
  title: string; 

  @IsString({ message: 'تکایە دەبێت نووسین بێت' }) // Must be string
  @IsNotEmpty({ message: 'تکایە نابێت بەتاڵ بێت' }) // Must not be empty
  description: string; 

  @IsNotEmpty({ message: 'تکایە نابێت بەتاڵ بێت' }) // Must not be empty
  total_degree: number;
  
  @IsBoolean({ message: 'تکایە دەبێت بەڵێ یان نەخێر بێت' }) // Must be boolean
  @IsOptional()
  isActive?: boolean;

  @Min(1)
  projectId?: number;
}