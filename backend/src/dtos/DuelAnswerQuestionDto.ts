import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DuelAnswerQuestionDto {
  @IsNotEmpty()
  @IsString()
  duelId: string;

  @IsNotEmpty()
  @IsNumber()
  playerId: number;

  @IsNotEmpty()
  @IsNumber()
  questionId: number;

  @IsNotEmpty()
  @IsString()
  answer: string;
}
