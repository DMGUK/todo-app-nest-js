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
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("./todo.service");
const create_todo_dto_1 = require("./dto/create-todo.dto");
function parseUserCookie(cookie) {
    if (typeof cookie === 'object')
        return cookie;
    if (!cookie)
        throw new Error('Missing cookie');
    try {
        const decoded = decodeURIComponent(cookie);
        return decoded.startsWith('j:') ? JSON.parse(decoded.slice(2)) : JSON.parse(decoded);
    }
    catch {
        throw new Error('Invalid cookie');
    }
}
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async getTodos(page = 1, req) {
        const authCookie = req.cookies?.token;
        if (!authCookie)
            throw new common_1.UnauthorizedException();
        const user = parseUserCookie(authCookie);
        return this.todoService.getPaginatedTodos(user.id, +page, 2);
    }
    async getTodoById(id, req) {
        const authCookie = req.cookies?.token;
        if (!authCookie)
            throw new common_1.UnauthorizedException();
        const user = parseUserCookie(authCookie);
        return this.todoService.getTodoById(id, user.id);
    }
    async createTodo(dto, req) {
        const authCookie = req.cookies?.token;
        if (!authCookie)
            throw new common_1.UnauthorizedException();
        const user = parseUserCookie(authCookie);
        return this.todoService.createTodo(dto.title, dto.description, user.id);
    }
    async updateTodo(id, title, description, req) {
        const authCookie = req.cookies?.token;
        if (!authCookie)
            throw new common_1.UnauthorizedException();
        const user = parseUserCookie(authCookie);
        return this.todoService.editTodo(id, title, description, user.id);
    }
    async updateTodoStatus(id, isFinished, req) {
        const authCookie = req.cookies?.token;
        if (!authCookie)
            throw new common_1.UnauthorizedException();
        const user = parseUserCookie(authCookie);
        return this.todoService.updateTodoStatus(id, isFinished, user.id);
    }
    async deleteTodo(id, req) {
        const authCookie = req.cookies?.token;
        if (!authCookie)
            throw new common_1.UnauthorizedException();
        const user = parseUserCookie(authCookie);
        return this.todoService.deleteTodo(id, user.id);
    }
};
exports.TodoController = TodoController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getTodos", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getTodoById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_todo_dto_1.CreateTodoDto, Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "createTodo", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('title')),
    __param(2, (0, common_1.Body)('description')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "updateTodo", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('isFinished')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean, Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "updateTodoStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "deleteTodo", null);
exports.TodoController = TodoController = __decorate([
    (0, common_1.Controller)('todos'),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
//# sourceMappingURL=todo.controller.js.map