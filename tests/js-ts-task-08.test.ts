import { TodoApi } from "../JS-TS/solutions/todo-api";
import { TodoService } from "../JS-TS/solutions/todo-service";
import { Todo, TodoStatus } from "../JS-TS/solutions/types";

describe("Task 08: TodoService", () => {
    jest.setTimeout(10000);
    const service = new TodoService(new TodoApi());

    it("create should add todo", async () => {
        const created = await service.create("Service Item");
        expect(created.title).toBe("Service Item");
    });

    it("toggleStatus should change status", async () => {
        const [todo] = await service.search("service");
        const toggled = await service.toggleStatus(todo.id);
        expect(toggled.status).not.toBe(todo.status);
    });

    it("search should be case-insensitive", async () => {
        const list = await service.search("SERVICE");
        expect(list.length).toBeGreaterThan(0);
    });

    it("should throw an error if todo was not found", async () => {
        await expect(service.toggleStatus(1000)).rejects.toThrow("Todo not found");
    });
});
