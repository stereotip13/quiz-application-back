import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
//ДТО это объект, который не содержит в себе никакой логики и имеет только поля, эти объекты предназначены для обмена данными между подсистемами(клиент серв, серв серв)
export class CreateUserDTO {
  // @ApiProperty() //add info into swagger
  // @IsString()
  // otdel: string;

  // @ApiProperty() //add info into swagger
  // @IsNumber()
  // rating: number;

  @ApiProperty() //add info into swagger
  @IsString()
  snils: string;

  // @ApiProperty() //add info into swagger
  // @IsString()
  // role: string;

  @ApiProperty() //add info into swagger
  @IsString()
  name: string;

  @ApiProperty() //add info into swagger
  @IsString()
  password: string;
}
export class UpdateUserDto {
  @ApiProperty() //add info into swagger
  @IsString()
  otdel: string;

  @ApiProperty() //add info into swagger
  @IsNumber()
  rating: number;

  @ApiProperty() //add info into swagger
  @IsString()
  snils: string;

  @ApiProperty() //add info into swagger
  @IsString()
  role: string;

  @ApiProperty() //add info into swagger
  @IsString()
  name: string;
}
