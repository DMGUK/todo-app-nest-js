import { Todo } from '../todo/todo.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    todos: Todo[];
}
