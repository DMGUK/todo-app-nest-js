import { Controller, Get, Post, Body, Res, Render, Query } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @Render('index') 
  serveHome() {
    return {}; 
  }

  @Get('/signup')
  @Render('signup') 
  showSignupForm(@Query('error') error: string) {
    return { error };
  }

  @Post('/signup')
  async signup(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    try {
      await this.authService.signUp(username, password, email);
      return res.redirect('/login'); 
    } catch (error) {
      console.error('Signup failed:', error);
      return res.redirect('/signup?error=signup_failed'); 
    }
  }

  @Get('/login')
  @Render('login') 
  showLoginForm(@Query('error') error: string) {
    return { error };
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
        res.cookie('token', token, { httpOnly: true });
        return res.redirect('/todo'); 
      } else {
        return res.redirect('/login?error=invalid_credentials'); 
      }
    } catch (error) {
      console.error('Login failed:', error);
      return res.redirect('/login?error=login_failed'); 
    }
  }

  @Get('/logout')
  logout(@Res() res: Response) {
    res.clearCookie('token'); 
    return res.redirect('/'); 
  }
}
