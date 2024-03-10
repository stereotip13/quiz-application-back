import { IsString } from 'class-validator';

export class UserLoginDTO {
  @IsString()
  name: string;

  @IsString()
  password: string;
}
