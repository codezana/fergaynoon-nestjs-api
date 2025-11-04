import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateUsersDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsNumber()
  reset?: number;
}
