import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DuelAnswerQuestionDto {
  @IsNotEmpty()
  @IsString()
  duelId: string;

  @IsNotEmpty()
  @IsString()
  answer: string;
}
