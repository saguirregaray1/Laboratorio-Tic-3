import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetCurrentQuestionDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  galaxyId: number;

  @IsNotEmpty()
  @IsNumber()
  worldId: number;
}
