import { TodoService } from "../JS-TS/todo-service";
import { NewTodo, TodoStatus, Todo } from "../JS-TS/types";
import { TodoApi, TodoNotFoundError } from "../JS-TS/api";

describe("api", () => {
    let api: TodoApi;

    beforeEach(() => {
        api = new TodoApi();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    describe("getAll", () => {
        it("should return empty array when no todos", async () => {
            const promise = api.getAll();
            jest.advanceTimersByTime(600);
            const result = await promise;

            expect(result).toEqual([]);
        });

        it("should return all todos correctly", async () => {
            const addPromise1 = api.add({ title: "title", description: "description", status: TodoStatus.IN_PROGRESS });
            jest.advanceTimersByTime(600);
            const todo1 = await addPromise1;

            const addPromise2 = api.add({ title: "title2", description: "description2", status: TodoStatus.COMPLETED });
            jest.advanceTimersByTime(600);
            const todo2 = await addPromise2;

            const getAllPromise = api.getAll();
            jest.advanceTimersByTime(600);
            const result = await getAllPromise;

            expect(result).toEqual([todo1, todo2]);
        });
    });

    describe("add", () => {
        it("should create todo with generated id and createdAt fields", async () => {
            const promise = api.add({ title: "title", description: "description", status: TodoStatus.IN_PROGRESS });
            jest.advanceTimersByTime(600);
            const result = await promise;

            expect(result.title).toBe("title");
            expect(result.id).toBe(1);
            expect(result.createdAt).toEqual(new Date());
        });

        it("should increment ids", async () => {
            const promise1 = api.add({ title: "title", description: "description", status: TodoStatus.IN_PROGRESS });
            jest.advanceTimersByTime(600);
            const result1 = await promise1;

            const promise2 = api.add({ title: "title2", description: "description2", status: TodoStatus.COMPLETED });
            jest.advanceTimersByTime(600);
            const result2 = await promise2;

            expect(result1.id).toBe(1);
            expect(result2.id).toBe(2);
        });

        describe("update", () => {
            it("should update existing todo", async () => {
                const addPromise = api.add({
                    title: "title",
                    description: "description",
                    status: TodoStatus.IN_PROGRESS,
                });
                jest.advanceTimersByTime(600);
                const todo = await addPromise;

                const updatePromise = api.update(todo.id, {
                    title: "new title",
                    description: "new description",
                    status: TodoStatus.COMPLETED,
                });
                jest.advanceTimersByTime(600);
                const result = await updatePromise;

                expect(result.title).toBe("new title");
                expect(result.id).toBe(todo.id);
            });

            it("should throw error when updating non-existing todo", async () => {
                const updatePromise = api.update(1000, { title: "title", description: "description" });
                jest.advanceTimersByTime(600);

                await expect(updatePromise).rejects.toThrow(TodoNotFoundError);
            });
        });

        describe("remove", () => {
            it("should remove existing todo", async () => {
                const addPromise = api.add({
                    title: "title",
                    description: "description",
                    status: TodoStatus.IN_PROGRESS,
                });
                jest.advanceTimersByTime(600);
                const todo = await addPromise;

                const removePromise = api.remove(todo.id);
                jest.advanceTimersByTime(600);
                await expect(removePromise).resolves.toBeUndefined();

                const getAllPromise = api.getAll();
                jest.advanceTimersByTime(600);
                const allTodos = await getAllPromise;

                expect(allTodos).toHaveLength(0);
            });

            it("should throw error when removing non-existing todo", async () => {
                const removePromise = api.remove(1000);
                jest.advanceTimersByTime(600);
                await expect(removePromise).rejects.toThrow(TodoNotFoundError);
            });
        });
    });
});
