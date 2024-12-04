import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Render,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
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
    const decodedCookie = decodeURIComponent(cookie); // Decode URL-encoded cookie
    console.log('Decoded Cookie:', decodedCookie);

    if (decodedCookie.startsWith('j:')) {
      const jsonString = decodedCookie.slice(2); // Remove "j:" prefix
      console.log('JSON String:', jsonString);
      return JSON.parse(jsonString); // Parse the JSON string
    }

    console.log('Cookie is not prefixed with "j:", attempting to parse directly');
    return JSON.parse(decodedCookie); // Parse directly if no prefix
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
  async getTodos(@Req() req: Request) {
    const authCookie = req.cookies?.token;
    if (!authCookie) {
      throw new UnauthorizedException('User not logged in');
    }

    const user = parseUserCookie(authCookie);
    const todos = await this.todoService.getTodos(user.id); // Pass only user ID
    return { todos };
  }

  @Get('/create_todo')
  @Render('create_todo') // Render the `create_todo` view
  async showCreateTodoForm(@Req() req: Request) {
    const authCookie = req.cookies?.token;
    if (!authCookie) {
      throw new UnauthorizedException('User not logged in');
    }

    parseUserCookie(authCookie); // Ensure the user is logged in
    return {}; // Return any additional data if needed for the template
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

  @Get('/:id') // Dynamic routes should come after more specific routes
  @Render('todo_details')
  async getTodoById(@Param('id') id: number, @Req() req: Request) {
    const authCookie = req.cookies?.token;
    if (!authCookie) {
      throw new UnauthorizedException('User not logged in');
    }

    const user = parseUserCookie(authCookie);
    const todo = await this.todoService.getTodoById(id, user.id);
    return { todo };
  }

  @Patch(':id/edit') // tomorrow
  async editTodo(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('description') description: string,
    @Req() req: Request,
  ) {
    const authCookie = req.cookies?.token;
    if (!authCookie) {
      throw new UnauthorizedException('User not logged in');
    }

    const user = parseUserCookie(authCookie);
    return this.todoService.editTodo(id, title, description, user.id);
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

    // Toggle the status of the todo
    const todo = await this.todoService.getTodoById(id, user.id);
    const newStatus = !todo.isFinished;
    await this.todoService.updateTodoStatus(id, newStatus, user.id);

    return res.redirect('/todo'); // Redirect back to the todo list
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

    return res.redirect('/todo'); // Redirect back to the todo list
  }
}
