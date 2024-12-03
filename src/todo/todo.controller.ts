import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(@GetUser() user: User) {
    return this.todoService.getTodos(user);
  }

  @Post()
  createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: User,
  ) {
    return this.todoService.createTodo(createTodoDto.title, createTodoDto.description, user);
  }

  @Patch(':id/status')
  updateTodoStatus(
    @Param('id') id: number,
    @Body('isFinished') isFinished: boolean,
    @GetUser() user: User,
  ) {
    return this.todoService.updateTodoStatus(id, isFinished, user);
  }

  @Delete(':id')
  deleteTodo(
    @Param('id') id: number,
    @GetUser() user: User,
  ) {
    return this.todoService.deleteTodo(id, user);
  }
}
