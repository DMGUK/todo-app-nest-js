import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { User } from '../auth/user.entity';
export declare class TodoService {
    private readonly todoRepository;
    private readonly userRepository;
    constructor(todoRepository: Repository<Todo>, userRepository: Repository<User>);
    getPaginatedTodos(userId: number, page: number, limit: number): Promise<{
        todos: Todo[];
        totalPages: number;
    }>;
    getTodos(userId: number): Promise<Todo[]>;
    getTodoById(id: number, userId: number): Promise<Todo>;
    createTodo(title: string, description: string, userId: number): Promise<Todo>;
    updateTodoStatus(id: number, isFinished: boolean, userId: number): Promise<Todo>;
    editTodo(id: number, title: string, description: string, userId: number): Promise<Todo>;
    deleteTodo(id: number, userId: number): Promise<void>;
}
