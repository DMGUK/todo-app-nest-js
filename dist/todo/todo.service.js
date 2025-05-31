"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_entity_1 = require("./todo.entity");
const user_entity_1 = require("../auth/user.entity");
let TodoService = class TodoService {
    constructor(todoRepository, userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }
    async getPaginatedTodos(userId, page, limit) {
        const [todos, count] = await this.todoRepository.findAndCount({
            where: { user: { id: userId } },
            take: limit,
            skip: (page - 1) * limit,
        });
        const totalPages = Math.ceil(count / limit);
        return { todos, totalPages };
    }
    async getTodos(userId) {
        return this.todoRepository.find({
            where: { user: { id: userId } },
        });
    }
    async getTodoById(id, userId) {
        const todo = await this.todoRepository.findOne({
            where: { id, user: { id: userId } },
        });
        if (!todo) {
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        }
        return todo;
    }
    async createTodo(title, description, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const todo = this.todoRepository.create({
            title,
            description,
            user,
        });
        return this.todoRepository.save(todo);
    }
    async updateTodoStatus(id, isFinished, userId) {
        const todo = await this.getTodoById(id, userId);
        todo.isFinished = isFinished;
        return this.todoRepository.save(todo);
    }
    async editTodo(id, title, description, userId) {
        const todo = await this.getTodoById(id, userId);
        todo.title = title;
        todo.description = description;
        return this.todoRepository.save(todo);
    }
    async deleteTodo(id, userId) {
        const result = await this.todoRepository
            .createQueryBuilder()
            .delete()
            .from(todo_entity_1.Todo)
            .where('id = :id AND userId = :userId', { id, userId })
            .execute();
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Todo with ID ${id} not found or does not belong to the user`);
        }
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_entity_1.Todo)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TodoService);
//# sourceMappingURL=todo.service.js.map