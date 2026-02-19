import { Model, Column, DataType, Table, HasMany } from 'sequelize-typescript';
import { Todo } from '../todos/todos.model';

export interface UserCreationAttributes {
  name: string;
  email: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, unique: true, allowNull: false })
  email: string;

  @HasMany(() => Todo)
  todos: Todo[];
}
