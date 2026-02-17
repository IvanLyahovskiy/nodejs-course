import { TodoApi } from "./todo-api";
import { Todo, TodoStatus } from "./types";

export class TodoService {
    constructor(private readonly api: TodoApi) {}

    async create(title: string, description = ""): Promise<Todo> {
        if (!title || title.trim().length === 0) {
            throw new Error("Title cannot be empty");
        }
        return await this.api.add({ title, description, status: TodoStatus.IN_PROGRESS });
    }

    async toggleStatus(id: number): Promise<Todo> {
        const allTodos = await this.api.getAll();
        const todo: Todo | undefined = allTodos.find(item => item.id === id);
        if (todo === undefined) {
            throw new Error("Todo not found");
        }

        let newStatus: TodoStatus;

        switch (todo.status) {
            case TodoStatus.PENDING: {
                newStatus = TodoStatus.IN_PROGRESS;
                break;
            }
            case TodoStatus.IN_PROGRESS: {
                newStatus = TodoStatus.COMPLETED;
                break;
            }
            case TodoStatus.COMPLETED: {
                newStatus = TodoStatus.IN_PROGRESS;
                break;
            }
            default:
                newStatus = todo.status;
        }
        return await this.api.update(id, { ...todo, status: newStatus });
    }

    async search(keyword: string): Promise<Todo[]> {
        const allTodos = await this.api.getAll();
        if (!keyword || keyword.trim().length === 0) {
            return allTodos;
        }
        return allTodos.filter(
            todo =>
                todo.title.toLowerCase().includes(keyword.toLowerCase()) ||
                todo.description?.toLowerCase().includes(keyword.toLowerCase()),
        );
    }
}
