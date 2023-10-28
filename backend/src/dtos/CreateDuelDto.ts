import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDuelDto {
  @IsNotEmpty()
  @IsNumber()
  ownerId: number;

  @IsNotEmpty()
  @IsNumber()
  rounds: number;

  @IsNotEmpty()
  @IsString()
  universe: string;

  @IsNotEmpty()
  @IsString()
  galaxy: string;
}
