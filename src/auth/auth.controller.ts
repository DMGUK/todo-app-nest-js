import { Controller, Get, Post, Body, Res, Render } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service'; // Adjust path as per your project structure

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Root endpoint: Render the home page
  @Get()
  @Render('index') // Render the Handlebars template named "index.hbs"
  serveHome() {
    return {}; // Pass any data to the template if necessary
  }

  // Display the signup form
  @Get('/signup')
  @Render('signup') // Render the Handlebars template named "signup.hbs"
  showSignupForm() {
    return {};
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
      return res.redirect('/login'); // Redirect to the login page on success
    } catch (error) {
      console.error('Signup failed:', error);
      return res.redirect('/signup?error=signup_failed'); // Redirect back with an error
    }
  }

  // Display the login form
  @Get('/login')
  @Render('login') // Render the Handlebars template named "login.hbs"
  showLoginForm() {
    return {};
  }

  // Handle login form submission
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
        return res.redirect('/todo'); // Redirect to the todos page on successful login
      } else {
        return res.redirect('/login?error=invalid_credentials'); // Redirect back to login with an error
      }
    } catch (error) {
      console.error('Login failed:', error);
      return res.redirect('/login?error=login_failed'); // Redirect back to login with a general error
    }
  }

  @Get('/logout')
  logout(@Res() res: Response) {
    res.clearCookie('token'); // Clear the authentication cookie
    return res.redirect('/login'); // Redirect to the login page after logout
  }
}
