import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty() //add info into swagger
  @IsString()
  otdel: string;

  @ApiProperty() //add info into swagger
  @IsNumber()
  rating: number;

  @ApiProperty() //add info into swagger
  @IsString()
  role: string;

  @ApiProperty() //add info into swagger
  @IsString()
  name: string;

  @ApiProperty() //add info into swagger
  @IsString()
  password: string;
}
export class updateUserDto {
  @ApiProperty() //add info into swagger
  @IsString()
  otdel: string;

  @ApiProperty() //add info into swagger
  @IsNumber()
  rating: number;

  @ApiProperty() //add info into swagger
  @IsString()
  role: string;

  @ApiProperty() //add info into swagger
  @IsString()
  name: string;
}
