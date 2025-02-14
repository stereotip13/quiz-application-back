import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { ApiProperty } from '@nestjs/swagger';

interface ResultCreationAttrs {
  user_id: number;
  user_results: number;
}

@Table({ tableName: 'results', createdAt: false, updatedAt: false })
export class Result extends Model<Result, ResultCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'User ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @ApiProperty({ example: '85', description: 'User test results' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_results: number;

  @ApiProperty({
    example: '2024-03-20 15:30:00',
    description: 'Result timestamp',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  timestamp: Date;

  @BelongsTo(() => User)
  user: User;
}
