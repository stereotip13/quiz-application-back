import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/module/roles/models/roles.model';
import { UserRoles } from 'src/module/roles/models/user-roles.model';

@Table
export class User extends Model {
  @Column
  otdel: string;
  @Column
  rating: number;
  @Column
  name: string;
  @Column
  password: string;
  @Column
  snils: string;
  @BelongsToMany(() => Role, () => UserRoles)
  role: Role[];
}
