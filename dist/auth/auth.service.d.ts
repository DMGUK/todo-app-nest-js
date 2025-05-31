import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    signUp(username: string, password: string, email: string): Promise<void>;
    validateUser(username: string, password: string): Promise<User>;
    logout(): void;
}
