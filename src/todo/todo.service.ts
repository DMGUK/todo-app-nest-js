import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getTodos(userId: number): Promise<Todo[]> {
    return this.todoRepository.find({
      where: { user: { id: userId } },
    });
  }

  async getTodoById(id: number, userId: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async createTodo(
    title: string,
    description: string,
    userId: number,
  ): Promise<Todo> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const todo = this.todoRepository.create({
      title,
      description,
      user,
    });

    return this.todoRepository.save(todo);
  }

  async updateTodoStatus(
    id: number,
    isFinished: boolean,
    userId: number,
  ): Promise<Todo> {
    const todo = await this.getTodoById(id, userId);
    todo.isFinished = isFinished;
    return this.todoRepository.save(todo);
  }

  async editTodo(
    id: number,
    title: string,
    description: string,
    userId: number,
  ): Promise<Todo> {
    const todo = await this.getTodoById(id, userId);
    todo.title = title;
    todo.description = description;
    return this.todoRepository.save(todo);
  }

  async deleteTodo(id: number, userId: number): Promise<void> {
    const result = await this.todoRepository.delete({
      id,
      user: { id: userId },
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}
