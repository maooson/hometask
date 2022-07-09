import {
  IsNotEmpty, Matches, MaxLength, MinLength,
} from 'class-validator';

export class RoleRequest {
  @IsNotEmpty()
  // alphanumeric characters and - are valid
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
  @MaxLength(20)
  @MinLength(3)
  name: string;
}
