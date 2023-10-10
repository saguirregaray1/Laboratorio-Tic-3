import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDuelDto {
  @IsNotEmpty()
  @IsString()
  ownerId: number;

  @IsNotEmpty()
  @IsString()
  rounds: number;
}
