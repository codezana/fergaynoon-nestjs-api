import { IsString, IsBoolean, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreatePartDto {
  @IsString({message: 'ناونیشان دەبێت نووسین بێت'})
  @IsNotEmpty({message: 'ناونیشان نابێت بەتاڵ بێت'})
  @MinLength(3, {message: 'ناونیشان دەبێت لانیکەم ٣ پیت بێت'})
  title: string;

  @IsString({message: 'وەسف دەبێت نووسین بێت'})
  @IsNotEmpty({message: 'وەسف نابێت بەتاڵ بێت'})
  description: string;

  @IsString({message: 'ئایکۆن دەبێت نووسین بێت'})
  @IsNotEmpty({message: 'ئایکۆن نابێت بەتاڵ بێت'})
  icon: string;

  @IsBoolean({message: 'چالاکی دەبێت بەڵێ/نەخێر بێت'})
  @IsOptional({ message: 'ئەم بەشە ئارەزوومەندانەیە' }) // This field is optional
  is_active: boolean;
}