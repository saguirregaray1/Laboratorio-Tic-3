import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuestionWithTheoremDto {
  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  worldId: number;

  @IsNotEmpty()
  @IsString()
  theoremName: string;

  @IsNotEmpty()
  @IsString()
  statement: string;

  @IsNotEmpty()
  @IsString()
  proof: string;
}
