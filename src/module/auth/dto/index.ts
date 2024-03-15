import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginDTO {
  @ApiProperty() //add info into swagger
  @IsString()
  name: string;

  @ApiProperty() //add info into swagger
  @IsString()
  password: string;
}
