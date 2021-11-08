import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}
