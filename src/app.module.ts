import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Todo } from './todo/todo.entity';
import { User } from './auth/user.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'templates'), // Adjust this path to match your templates folder
      serveRoot: '/', // Serve the templates at the root of the application
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root_mysql123@@@345',
      database: 'todo_app',
      entities: [User, Todo],
      synchronize: true, 
      logging: ['query', 'error'],
    }),
    TodoModule,
    AuthModule,
  ],
})
export class AppModule {}
