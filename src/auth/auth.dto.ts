import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'ناوی بەکارهێنەر دەبێت نووسین بێت' })
  username: string;

  @IsString({ message: 'وشەی نهێنی دەبێت نووسین بێت' })
  password: string;
}

export class LoginDto {
  @IsString({ message: 'ناوی بەکارهێنەر دەبێت نووسین بێت' })
  username: string;

  @IsString({ message: 'وشەی نهێنی دەبێت نووسین بێت' })
  password: string;
}