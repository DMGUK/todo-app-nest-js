import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './todo.entity';
import { PassportModule } from '@nestjs/passport';
import { User } from '../auth/user.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }), // <-- Import PassportModule here
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
