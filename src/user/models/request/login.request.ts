import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
