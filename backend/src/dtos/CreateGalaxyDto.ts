import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateGalaxyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsString()
  universe: string;
}
