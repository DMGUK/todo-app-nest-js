import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  entity: [Todo]
})
export class TodoModule {}
