import { TodoService } from "./todo-service";
import { TodoApi } from "./todo-api";
import { NewTodo, Todo, TodoStatus } from "./types";
import { InMemoryRepository } from "./repository";

export class ToDoManager {
    private service: TodoService = new TodoService(new TodoApi());

    constructor() {
        const repo = new InMemoryRepository();
        const api = new TodoApi();
        this.service = new TodoService(api);
    }

    async init(): Promise<void> {
        const demoData: Omit<NewTodo, "status">[] = [
            { title: "title1", description: "description1" },
            { title: "title2", description: "description2" },
            { title: "title3", description: "description3" },
        ];

        for (const item of demoData) {
            await this.service.create(item.title, item.description);
        }
    }

    async add(title: string, description = ""): Promise<void> {
        await this.service.create(title, description);
    }

    async complete(id: number): Promise<void> {
        await this.service.toggleStatus(id);
    }

    async list(): Promise<Todo[]> {
        return await this.service.search("");
    }
}
