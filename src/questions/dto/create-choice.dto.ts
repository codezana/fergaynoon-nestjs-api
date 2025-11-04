import { IsString, IsBoolean, IsNotEmpty, Length} from 'class-validator';

export class CreateChoiceDto {
  @IsNotEmpty({ message: 'کلیلی هەڵبژاردن نابێت بەتاڵ بێت' })
  @Length(1, 1, { message: 'کلیلی هەڵبژاردن دەبێت تەنها یەک پیت بێت' })
  choiceKey: string;

  @IsNotEmpty({ message: 'ناوەڕۆکی دەقی هەڵبژاردن نابێت بەتاڵ بێت' })
  @IsString({ message: 'ناوەڕۆکی دەقی هەڵبژاردن دەبێت نووسە بێت' })
  choiceText: string;

  @IsBoolean({ message: 'دەبێت بەهای ڕاست یان هەڵە بێت' })
  isCorrect: boolean;
}
