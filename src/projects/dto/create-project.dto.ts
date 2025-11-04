import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString({ message: 'تکایە دەبێت نووسین بێت' }) // Must be string
  @IsNotEmpty({ message: 'تکایە نابێت بەتاڵ بێت' }) // Must not be empty
  title: string; 

  @IsString({ message: 'تکایە دەبێت نووسین بێت' }) // Must be string
  @IsNotEmpty({ message: 'تکایە نابێت بەتاڵ بێت' }) // Must not be empty
  description: string; 

  @IsBoolean({ message: 'تکایە دەبێت بەڵێ یان نەخێر بێت' }) // Must be boolean
  @IsOptional()
  isActive?: boolean ;

  @IsOptional()
  imagePath?: string; // Will be set by the service
}
