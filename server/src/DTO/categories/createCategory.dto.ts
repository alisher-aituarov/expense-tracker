import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsString()
  color: string;
}
