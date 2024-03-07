import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  otdel: string;
  @Column
  rating: number;
  @Column
  role: string;
  @Column
  name: string;
  @Column
  password: string;
}
