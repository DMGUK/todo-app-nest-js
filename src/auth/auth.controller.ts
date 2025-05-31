import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth') // changed from '/' to 'auth'
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    try {
      await this.authService.signUp(username, password, email);
      return res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
      console.error('Signup failed:', error);

      // If the error is an HttpException (like ConflictException), preserve its response
      if (error.getStatus && error.getResponse) {
        return res
          .status(error.getStatus())
          .json(error.getResponse());
      }

      // Otherwise fallback to generic bad request
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Signup failed' });
    }
  }


  @Post('/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    try {
      const token = await this.authService.validateUser(username, password);
      if (token) {
        res.cookie('token', token, {
          httpOnly: true,
          sameSite: 'lax',
        });
        return res.status(200).json({ message: 'Login successful' });
      } else {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/logout')
  logout(@Res() res: Response) {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out' });
  }
}
