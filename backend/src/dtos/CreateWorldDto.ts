import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateWorldDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  galaxyId: number;
}
