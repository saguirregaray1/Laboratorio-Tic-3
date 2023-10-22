import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDuelDto {
  @IsNotEmpty()
  @IsNumber()
  ownerId: number;

  @IsNotEmpty()
  @IsNumber()
  rounds: number;
}
