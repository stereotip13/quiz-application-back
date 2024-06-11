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
  role: object;

  @ApiProperty() //add info into swagger
  @IsString()
  name: string;

  @ApiProperty() //add info into swagger
  @IsString()
  password: string;

  @ApiProperty() //add info into swagger
  @IsString()
  snils: string;
}
export class UpdateUserDto {
  @ApiProperty() //add info into swagger
  @IsString()
  otdel: string;

  @ApiProperty() //add info into swagger
  @IsNumber()
  rating: number;

  @ApiProperty() //add info into swagger
  role: object;

  @ApiProperty() //add info into swagger
  @IsString()
  name: string;

  @ApiProperty() //add info into swagger
  @IsString()
  snils: string;
}
export class AddRoleDto {
  @IsString({message: "Должно быть строкой"})
  readonly value:string;
  @IsNumber({},{message:"Должно быть числом"})
  readonly userId:number;
}
