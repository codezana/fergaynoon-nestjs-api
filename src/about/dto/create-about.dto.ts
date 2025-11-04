import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateAboutDto {

  
  @IsNotEmpty({ message: 'وەسف نابێت بەتاڵ بێت' })
  @IsString({ message: 'وەسف دەبێت نووسین بێت' })
  description: string;

  @IsNotEmpty({ message: 'ژمارەی مۆبایل نابێت بەتاڵ بێت' })
  phone: string;

  @IsNotEmpty({ message: 'ئیمەیڵ نابێت بەتاڵ بێت' })
  @IsEmail({}, { message: 'فۆرماتی ئیمەیڵ هەڵەیە' })
  email: string;
}
