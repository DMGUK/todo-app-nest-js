import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Request } from 'express';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    getTodos(page: number, req: Request): Promise<{
        todos: import("./todo.entity").Todo[];
        totalPages: number;
    }>;
    getTodoById(id: number, req: Request): Promise<import("./todo.entity").Todo>;
    createTodo(dto: CreateTodoDto, req: Request): Promise<import("./todo.entity").Todo>;
    updateTodo(id: number, title: string, description: string, req: Request): Promise<import("./todo.entity").Todo>;
    updateTodoStatus(id: number, isFinished: boolean, req: Request): Promise<import("./todo.entity").Todo>;
    deleteTodo(id: number, req: Request): Promise<void>;
}
