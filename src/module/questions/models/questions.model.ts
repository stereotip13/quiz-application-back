import { ApiProperty } from '@nestjs/swagger';
import {Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Questions extends Model {
  @ApiProperty({description:'текст вопроса'})
  @Column ({type: DataType.STRING, allowNull: false })
  text: string;

  @ApiProperty({description:'правильный ответ'})
  @Column ({type: DataType.STRING, allowNull: false})
  right_ansv: string;

  @ApiProperty({description:'неверный ответ'})
  @Column ({type: DataType.STRING,  allowNull: false })
  wrong_answ1: string;

  @ApiProperty({description:'неверный ответ'})
  @Column ({type: DataType.STRING, allowNull: false})
  wrong_answ2: string;

  @ApiProperty({description:'неверный ответ'})
  @Column ({type: DataType.STRING, allowNull: false})
  wrong_answ3: string;

  @ApiProperty({description:'категория категория'})
  @Column ({type: DataType.STRING, allowNull: false})
  category: string;

  @ApiProperty({description:'сложность вопроса'})
  @Column ({type: DataType.STRING, allowNull: false})
  difficulty: string;
}
