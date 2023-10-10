import { IsNotEmpty, IsString } from 'class-validator';

export class DuelAnswerQuestionDto {
  @IsNotEmpty()
  @IsString()
  duelId: string;

  @IsNotEmpty()
  @IsString()
  playerId: number;

  @IsNotEmpty()
  @IsString()
  questionId: number;

  @IsNotEmpty()
  @IsString()
  answer: string;
}
