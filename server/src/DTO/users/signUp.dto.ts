import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(3, { message: 'Username is too short' })
  @MaxLength(20, { message: 'Username is too long' })
  public username: string;

  @IsString()
  @MinLength(8, { message: 'Password is too short' })
  @MaxLength(30, { message: 'Password is too long' })
  public password: string;
}
