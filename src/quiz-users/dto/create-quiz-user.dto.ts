import { IsString, IsEmail, IsPhoneNumber, IsIP, IsNotEmpty } from 'class-validator';

export class CreateQuizUserDto {

  @IsString({ message: 'تکایە تەنها پیت بەکاربێنە' })
  @IsNotEmpty({ message: 'تکایە ناو پڕبکەرەوە' })
  name: string;

  
  @IsNotEmpty({ message: 'تکایە ژمارەی مۆبایل پڕبکەرەوە' })
  phone: string;

  
  @IsEmail({}, { message: 'تکایە ئیمەیڵ بە دروستی بنووسە' })
  @IsNotEmpty({ message: 'تکایە ئیمەیڵ پڕبکەرەوە' })
  email: string;

  
  @IsString({ message: 'تکایە تەنها پیت بەکاربێنە' })
  @IsNotEmpty({ message: 'تکایە شار پڕبکەرەوە' })
  city: string;

  
  @IsIP('4', { message: 'تکایە ناونیشانی ئایپی بە دروستی بنووسە' })  // For IPv4
  @IsNotEmpty({ message: 'تکایە ناونیشانی ئایپی پڕبکەرەوە' })
  ipAddress: string;
}
