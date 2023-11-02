import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDuelDto {
  @IsNotEmpty()
  @IsString()
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
