import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CheckAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  questionId: number;

  @IsNotEmpty()
  @IsString()
  answer: string;
}
