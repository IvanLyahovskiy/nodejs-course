import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './todos.model';

@Module({
  providers: [TodosService],
  controllers: [TodosController],
  imports: [SequelizeModule.forFeature([Todo])],
})
export class TodosModule {}
