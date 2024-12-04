import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Todo } from './todo/todo.entity';
import { User } from './auth/user.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'templates'), // Path to your HTML templates folder
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
    }),
    TodoModule,
    AuthModule,
  ],
})
export class AppModule {}
