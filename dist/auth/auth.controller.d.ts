import { Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(username: string, email: string, password: string, res: Response): Promise<Response<any, Record<string, any>>>;
    login(username: string, password: string, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(res: Response): Response<any, Record<string, any>>;
}
