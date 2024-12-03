import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './todo.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    PassportModule.register({ defaultStrategy: 'jwt' }), // <-- Import PassportModule here
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
