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
        return res.status(200).json({ success: true, token }); // Return JSON instead of redirecting
      } else {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login failed:', error);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
  
}
