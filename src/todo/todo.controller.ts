import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Request } from 'express';

function parseUserCookie(cookie: string | object): any {
  if (typeof cookie === 'object') return cookie;
  if (!cookie) throw new Error('Missing cookie');
  try {
    const decoded = decodeURIComponent(cookie);
    return decoded.startsWith('j:') ? JSON.parse(decoded.slice(2)) : JSON.parse(decoded);
  } catch {
    throw new Error('Invalid cookie');
  }
}

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(@Query('page') page = 1, @Req() req: Request) {
    const authCookie = req.cookies?.token;
    if (!authCookie) throw new UnauthorizedException();
    const user = parseUserCookie(authCookie);
    return this.todoService.getPaginatedTodos(user.id, +page, 2);
  }

  @Get(':id')
  async getTodoById(@Param('id') id: number, @Req() req: Request) {
    const authCookie = req.cookies?.token;
    if (!authCookie) throw new UnauthorizedException();
    const user = parseUserCookie(authCookie);
    return this.todoService.getTodoById(id, user.id);
  }

  @Post()
  async createTodo(@Body() dto: CreateTodoDto, @Req() req: Request) {
    const authCookie = req.cookies?.token;
    if (!authCookie) throw new UnauthorizedException();
    const user = parseUserCookie(authCookie);
    return this.todoService.createTodo(dto.title, dto.description, user.id);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('description') description: string,
    @Req() req: Request,
  ) {
    const authCookie = req.cookies?.token;
    if (!authCookie) throw new UnauthorizedException();
    const user = parseUserCookie(authCookie);
    return this.todoService.editTodo(id, title, description, user.id);
  }

  @Patch(':id/status')
  async updateTodoStatus(
    @Param('id') id: number,
    @Body('isFinished') isFinished: boolean,
    @Req() req: Request,
  ) {
    const authCookie = req.cookies?.token;
    if (!authCookie) throw new UnauthorizedException();
    const user = parseUserCookie(authCookie);
    return this.todoService.updateTodoStatus(id, isFinished, user.id);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number, @Req() req: Request) {
    const authCookie = req.cookies?.token;
    if (!authCookie) throw new UnauthorizedException();
    const user = parseUserCookie(authCookie);
    return this.todoService.deleteTodo(id, user.id);
  }
}
