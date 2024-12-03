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
  ) {}

  async getTodos(user: User): Promise<Todo[]> {
    return this.todoRepository.find({ where: { user } });
  }

  async createTodo(title: string, description: string, user: User): Promise<Todo> {
    const todo = this.todoRepository.create({ title, description, user });
    await this.todoRepository.save(todo);
    return todo;
  }

  async updateTodoStatus(id: number, isFinished: boolean, user: User): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id, user } });
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);
    todo.isFinished = isFinished;
    await this.todoRepository.save(todo);
    return todo;
  }

  async deleteTodo(id: number, user: User): Promise<void> {
    const result = await this.todoRepository.delete({ id, user });
    if (result.affected === 0) throw new NotFoundException(`Todo with ID ${id} not found`);
  }
}
