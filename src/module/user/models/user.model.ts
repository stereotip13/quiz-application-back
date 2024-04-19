import {Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column ({type: DataType.STRING, defaultValue: "ufk" })
  otdel: string;
  @Column ({type: DataType.INTEGER, defaultValue: 1})
  rating: number;
  @Column ({type: DataType.STRING, defaultValue: "user" })
  role: string;
  @Column ({type: DataType.STRING, allowNull: false})
  name: string;
  @Column ({type: DataType.STRING, allowNull: false})
  snils: string;
  @Column ({type: DataType.STRING, allowNull: false})
  password: string;
}
