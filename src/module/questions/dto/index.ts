import { ApiProperty } from '@nestjs/swagger';
import {IsString } from 'class-validator';
//ДТО это объект, который не содержит в себе никакой логики и имеет только поля, эти объекты предназначены для обмена данными между подсистемами(клиент серв, серв серв)
export class CreateQuestionDTO {
  @ApiProperty() //add info into swagger
  @IsString()
  text: string;

  @ApiProperty()
  @IsString()
  right_ansv: string;

  @ApiProperty()
  @IsString()
  wrong_answ1: string;

  @ApiProperty()
  @IsString()
  wrong_answ2: string;

  @ApiProperty()
  @IsString()
  wrong_answ3: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsString()
  difficulty: string;
}
