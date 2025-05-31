import { User } from 'src/auth/user.entity';
export declare class Todo {
    id: number;
    title: string;
    description: string;
    isFinished: boolean;
    user: User;
}
