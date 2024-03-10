import { IsNumber, IsString } from 'class-validator';

export class AuthUserResponse {
  @IsString()
  otdel: string;

  @IsNumber()
  rating: number;

  @IsString()
  role: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
