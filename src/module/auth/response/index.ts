import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AuthUserResponse {
  @ApiProperty()
  @IsString()
  otdel: string;

  @ApiProperty()
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsString()
  role: object;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  snils: string;

  @ApiProperty()
  @IsString()
  token: string;
}
