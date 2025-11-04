import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSocialMediaDto {
  @IsNotEmpty({ message: 'ئایکۆن نابێت بەتاڵ بێت' })
  @IsString({ message: 'ئایکۆن دەبێت نووسین بێت' })
  icon: string;

  @IsNotEmpty({ message: 'بەستەرەکە نابێت بەتاڵ بێت'})
  @IsString({ message: 'بەستەرەکە دەبێت نووسین بێت'})
  url: string;  // URL of the social media profile

  @IsNotEmpty()
  aboutId: number;  // ID of the associated About entity
}
