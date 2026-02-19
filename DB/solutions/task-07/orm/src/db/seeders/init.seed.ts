import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { User, UserCreationAttributes } from '../../users/users.model';
import {
  Todo,
  TodoCreationAttributes,
  TodoStatus,
} from '../../todos/todos.model';

dotenv.config();

async function seed() {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    username: process.env.POSTGRES_USERNAME,
    database: process.env.POSTGRES_DB,
    port: Number(process.env.POSTGRES_PORT),
    models: [User, Todo],
  });

  try {
    sequelize.authenticate();

    await Todo.destroy({ where: {}, force: true });
    await User.destroy({ where: {}, force: true });

    const users: UserCreationAttributes[] = [
      {
        name: 'User1',
        email: 'user1@gmail.com',
      },
      {
        name: 'Mike',
        email: 'Mike123@gmail.com',
      },
    ];

    for (const user of users) {
      await User.create({ ...user });
    }

    const todos: TodoCreationAttributes[] = [
      {
        title: 'do sports',
        description: 'go to the gym at 6p.m',
        status: TodoStatus.ACTIVE,
        userId: 1,
      },
      {
        title: 'completed todo with no description',
        status: TodoStatus.COMPLETED,
        userId: 1,
      },
      {
        title: 'buy groceries',
        description: 'chicken breast, milk, greec yogurt',
        status: TodoStatus.ACTIVE,
        userId: 1,
      },
      {
        title: 'learn english',
        description: 'speaking practice',
        status: TodoStatus.ACTIVE,
        userId: 2,
      },
      {
        title: 'completed todo for user 2',
        description: 'asdasdas',
        status: TodoStatus.COMPLETED,
        userId: 2,
      },
      {
        title: 'meet with friends',
        description: '5p.m. , Main st. , 123',
        status: TodoStatus.ACTIVE,
        userId: 2,
      },
    ];

    for (const todo of todos) {
      await Todo.create({ ...todo });
    }
  } catch (err) {
    console.log('seeding error - ', err);
  } finally {
    await sequelize.close();
  }
}

seed();
