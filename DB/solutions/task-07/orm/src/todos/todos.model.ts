import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/users.model';

export interface TodoCreationAttributes {
  title: string;
  description?: string;
  status: TodoStatus;
  userId: number;
}

export enum TodoStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

@Table({ tableName: 'todos' })
export class Todo extends Model<Todo, TodoCreationAttributes> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @Column({
    type: DataType.ENUM(...Object.values(TodoStatus)),
    defaultValue: TodoStatus.ACTIVE,
  })
  status: TodoStatus;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
