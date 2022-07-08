import {
  IsNotEmpty, Matches, MaxLength, MinLength,
} from 'class-validator';

export class SignupRequest {
  @IsNotEmpty()
  // alphanumeric characters and - are valid
  // you can change this as you like
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
