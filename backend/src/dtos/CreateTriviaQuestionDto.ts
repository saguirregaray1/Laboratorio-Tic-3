import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTriviaQuestionDto {
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
  @IsString()
  universe: string;

  @IsNotEmpty()
  @IsString()
  galaxy: string;

  @IsNotEmpty()
  @IsString()
  option1: string;

  @IsNotEmpty()
  @IsString()
  option2: string;

  @IsNotEmpty()
  @IsString()
  option3: string;

  @IsNotEmpty()
  @IsString()
  option4: string;
}
