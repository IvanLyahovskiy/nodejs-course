import { InMemoryRepository } from "./repository";
import { Todo, NewTodo } from "./types";

export class TodoNotFoundError extends Error {
    constructor(id: number) {
        super(`Todo with id : ${id} not found`);
        this.name = "TodoNotFoundError";
    }
}

function delay(): Promise<void> {
    const ms = 300 + Math.random() * 300;
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class TodoApi {
    private repo = new InMemoryRepository<Todo>();

    async getAll(): Promise<Todo[]> {
        await delay();
        return this.repo.findAll();
    }

    async add(newTodo: NewTodo): Promise<Todo> {
        await delay();
        const allTodos = this.repo.findAll();
        const maxId = allTodos.reduce((max, item) => Math.max(max, item.id), 0);

        return this.repo.add({ ...newTodo, id: maxId + 1, createdAt: new Date() });
    }

    async update(id: number, update: Partial<Omit<Todo, "id" | "createdAt">>): Promise<Todo> {
        await delay();
        try {
            return this.repo.update(id, update);
        } catch (err) {
            throw new TodoNotFoundError(id);
        }
    }

    async remove(id: number): Promise<void> {
        await delay();
        try {
            return this.repo.remove(id);
        } catch (err) {
            throw new TodoNotFoundError(id);
        }
    }
}
