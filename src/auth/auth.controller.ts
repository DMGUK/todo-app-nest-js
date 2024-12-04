import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { join } from 'path';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Display the signup form
  @Get('/signup')
  showSignupForm(@Res() res: Response) {
    res.sendFile(join(__dirname, '../templates/signup.html')); // Serve the signup template
  }

  // Handle signup form submission
  @Post('/signup')
  async signup(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    try {
      await this.authService.signUp(username, password, email);
      return res.redirect('/login'); // Redirect to login page on success
    } catch (error) {
      return res.redirect('/signup?error=signup_failed'); // Redirect back with an error
    }
  }

  // Display the login form
  @Get('/login')
  showLoginForm(@Res() res: Response) {
    res.sendFile(join(__dirname, '../templates/login.html')); // Serve the login template
  }

  @Post('/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const token = await this.authService.validateUser(username, password);
    if (token) {
      res.cookie('token', token, { httpOnly: true });
      return res.redirect('/todos'); // Redirect to the todos page on successful login
    } else {
      return res.redirect('/login?error=invalid_credentials'); // Redirect back with an error
    }
  }
}
