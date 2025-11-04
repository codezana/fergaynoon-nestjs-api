import { IsString, IsBoolean, IsNotEmpty, MinLength, MaxLength, Min, Max, IsOptional } from 'class-validator';

export class CreateLevelDto {
  @IsNotEmpty({ message: 'تکایە ناونیشانی ئاستەکە بنووسە' })
  @IsString({ message: 'ناونیشانی ئاستەکە دەبێت نووسین بێت' })
  @MinLength(3, { message: 'ناونیشانی ئاستەکە دەبێت لە ٣ پیت کەمتر نەبێت' })
  @MaxLength(100, { message: 'ناونیشانی ئاستەکە دەبێت لە ١٠٠ پیت زیاتر نەبێت' })
  title: string;

  @IsNotEmpty({ message: 'تکایە ژمارەی ئاستەکە بنووسە' })
  @Min(1, { message: 'ژمارەی ئاستەکە دەبێت لە ١ گەورەتر بێت' })
  level_key: number;

  @IsBoolean({ message: 'دۆخی چالاکی دەبێت ڕاست یان هەڵە بێت' })
  @IsOptional({ message: 'ئەم بەشە ئارەزوومەندانەیە' })
  is_active: boolean = true;

  @Min(1, { message:'ئایدی بەش داواکراوە'})
  partId?: number;
}
