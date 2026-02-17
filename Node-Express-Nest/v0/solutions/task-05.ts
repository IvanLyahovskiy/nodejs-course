// NestJS Controller for /todos
import { Controller, Get } from "@nestjs/common";

@Controller("todos")
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Get("get")
    getAll(): TodoDto[] {
        return this.todoService.getTodos();
    }

    @Post("post")
    create(@Body("title") title: string) {
        this.todoService.addTodo(title);

        return title;
    }

    @Get("search")
    search(@Query() query: TodoQueryDto) {
        return this.todoService.getTodosByQueryParams(query);
    }

    @Get(":id")
    getById(@Param("id") id: string): TodoDto {
        const todo = this.todoService.getTodoById(parseInt(id, 10));
        if (!todo) {
            throw new Error("todo not found");
        }
        return todo;
    }

    @Patch("complete/:id")
    markTodoAsCompleted(@Param("id") id: string): TodoDto {
        return this.todoService.markAsCompleted(parseInt(id));
    }
}
