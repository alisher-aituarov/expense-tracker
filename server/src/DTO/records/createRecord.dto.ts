import { Type } from '@prisma/client';
import {
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRecordDTO {
  @IsNumber()
  @IsPositive()
  public amount: number;

  @IsNumber()
  @IsPositive()
  public categoryId: number;

  @IsEnum(Type)
  public type: Type;

  @IsString()
  @MinLength(4)
  @MaxLength(40)
  public note: string;
}
