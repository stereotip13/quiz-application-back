import { ApiProperty } from '@nestjs/swagger';
import {Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @ApiProperty({example:'сокращенно пр-р ОКОИБ',description:'название отдела'})
  @Column ({type: DataType.STRING, defaultValue: "ufk" })
  otdel: string;

  @ApiProperty({description:'оценка пользователя'})
  @Column ({type: DataType.INTEGER, defaultValue: 1})
  rating: number;

  @ApiProperty({description:'роль пользователя'})
  @Column ({type: DataType.STRING, defaultValue: "user" })
  role: string;

  @ApiProperty({description:'имя пользователя'})
  @Column ({type: DataType.STRING, allowNull: false})
  name: string;

  @ApiProperty({description:'снилс пользователя'})
  @Column ({type: DataType.STRING, allowNull: false})
  snils: string;

  @ApiProperty({description:'пароль пользователя'})
  @Column ({type: DataType.STRING, allowNull: false})
  password: string;
}
