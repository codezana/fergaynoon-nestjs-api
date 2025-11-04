import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateProjectRegistrationDto {
  @IsInt({ message: 'ناسێنەری پرۆژە پێویستە ژمارەیەکی دروست بێت' })
  @IsNotEmpty({ message: 'ناسێنەری پرۆژە نابێت بەتاڵ بێت' })
  projectId: number;
}
