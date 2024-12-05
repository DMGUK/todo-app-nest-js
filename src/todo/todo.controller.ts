import { Controller, Get, Post, Body, Param, Render, Req, Res, UnauthorizedException, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Request, Response } from 'express';

// Helper function to parse user cookie
function parseUserCookie(cookie: string | object): any {
  if (typeof cookie === 'object') {
    console.log('Cookie is already an object:', cookie);
    return cookie;
  }

  console.log('Raw Cookie:', cookie);

  if (!cookie) {
    throw new Error('Cookie is missing or empty');
  }

  try {
    const decodedCookie = decodeURIComponent(cookie); 
    console.log('Decoded Cookie:', decodedCookie);

    if (decodedCookie.startsWith('j:')) {
      const jsonString = decodedCookie.slice(2); 
      console.log('JSON String:', jsonString);
      return JSON.parse(jsonString); 
    }

    console.log('Cookie is not prefixed with "j:", attempting to parse directly');
    return JSON.parse(decodedCookie);
  } catch (error) {
    console.error('Error parsing cookie:', error.message);
    throw new Error('Invalid cookie format');
  }
}

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @Render('todos')
  async getTodos(@Query('page') page = 1, @Req() req: Request) {
    const authCookie = req.cookies?.token;
    if (!authCookie) {
      throw new UnauthorizedException('User not logged in');
    }
    const user = parseUserCookie(authCookie);

    const { todos, totalPages } = await this.todoService.getPaginatedTodos(
      user.id,
      +page,
      5, 
    );

    return { todos, currentPage: +page, totalPages };
  }

  @Get('/create_todo')
  @Render('create_todo') 
  async showCreateTodoForm(@Req() req: Request) {
    const authCookie = req.cookies?.token;
    if (!authCookie) {
      throw new UnauthorizedException('User not logged in');
    }

    parseUserCookie(authCookie); 
    return {}; 
  }

  @Post('/create_todo')
  async createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const authCookie = req.cookies?.token;
    if (!authCookie) {
      return res.redirect('/login');
    }

    const user = parseUserCookie(authCookie);
    await this.todoService.createTodo(createTodoDto.title, createTodoDto.description, user.id);
    return res.redirect('/todo');
  }

  @Get('/:id/edit')
  @Render('edit_todo') 
  async showEditTodoForm(@Param('id') id: number, @Req() req: Request) {
    const authCookie = req.cookies?.token;
    if (!authCookie) {
      throw new UnauthorizedException('User not logged in');
    }

    const user = parseUserCookie(authCookie);
    const todo = await this.todoService.getTodoById(id, user.id);
    return { todo };
  }

  @Post(':id/edit') 
  async editTodo(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('description') description: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const authCookie = req.cookies?.token;
    if (!authCookie) {
      throw new UnauthorizedException('User not logged in');
    }

    const user = parseUserCookie(authCookie);
    await this.todoService.editTodo(id, title, description, user.id);
    return res.redirect('/todo');
  }

  @Get('/:id/status')
  async updateTodoStatus(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const authCookie = req.cookies?.token;
    if (!authCookie) {
      return res.redirect('/login');
    }

    const user = parseUserCookie(authCookie);

    const todo = await this.todoService.getTodoById(id, user.id);
    const newStatus = !todo.isFinished;
    await this.todoService.updateTodoStatus(id, newStatus, user.id);

    return res.redirect('/todo'); 
  }

  @Get('/:id/delete')
  async deleteTodo(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const authCookie = req.cookies?.token;
    if (!authCookie) {
      return res.redirect('/login');
    }

    const user = parseUserCookie(authCookie);
    await this.todoService.deleteTodo(id, user.id);

    return res.redirect('/todo'); 
  }
}
