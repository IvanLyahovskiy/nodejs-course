import { TodoService } from "../JS-TS/todo-service";
import { NewTodo, TodoStatus, Todo } from "../JS-TS/types";
import { TodoApi } from "../JS-TS/api";

jest.mock("../JS-TS/api");

type MockedTodoApi = jest.Mocked<TodoApi>;

describe("TodoService", () => {
    let todoService: TodoService;
    let mockApi: MockedTodoApi;

    beforeEach(() => {
        mockApi = new TodoApi() as MockedTodoApi;

        todoService = new TodoService(mockApi);

        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    describe("create", () => {
        it("should successfully create a todo", async () => {
            const mockTodo: Todo = {
                id: 1,
                createdAt: new Date(),
                title: "title",
                description: "description",
                status: TodoStatus.IN_PROGRESS,
            };

            mockApi.add.mockResolvedValue(mockTodo);

            const result = await todoService.create("title", "description");

            expect(result).toEqual(mockTodo);
            expect(mockApi.add).toHaveBeenCalledWith({
                title: "title",
                description: "description",
                status: TodoStatus.IN_PROGRESS,
            });
        });

        it("should throw error whenа title is empty", async () => {
            await expect(todoService.create("")).rejects.toThrow("Title cannot be empty");
        });

        it("should throw error when title is only whitespace", async () => {
            await expect(todoService.create("     ")).rejects.toThrow("Title cannot be empty");
        });

        it("should throw error when title is longer than 50 symbols", async () => {
            await expect(
                todoService.create("123456789012345678901234567890123456789012345678901234567890"),
            ).rejects.toThrow("Title is too long");
        });
    });

    describe("toggleStatus", () => {
        it("should change status from IN_PROGRESS TO COMPLETED", async () => {
            const todo: Todo = {
                id: 1,
                title: "title",
                description: "description",
                status: TodoStatus.IN_PROGRESS,
                createdAt: new Date(),
            };

            const updatedTodo = {
                id: 1,
                title: "title",
                description: "description",
                status: TodoStatus.COMPLETED,
                createdAt: new Date(),
            };

            mockApi.getAll.mockResolvedValue([todo]);
            mockApi.update.mockResolvedValue(updatedTodo);

            const result1 = await todoService.toggleStatus(1);

            expect(result1.status).toBe(TodoStatus.COMPLETED);
            expect(mockApi.getAll).toHaveBeenCalledTimes(1);
            expect(mockApi.update).toHaveBeenCalledWith(1, { ...todo, status: TodoStatus.COMPLETED });
        });

        it("should change status from COMPLETED TO IN_PROGRESS", async () => {
            const todo: Todo = {
                id: 1,
                title: "title",
                description: "description",
                status: TodoStatus.COMPLETED,
                createdAt: new Date(),
            };

            const updatedTodo = {
                id: 1,
                title: "title",
                description: "description",
                status: TodoStatus.IN_PROGRESS,
                createdAt: new Date(),
            };

            mockApi.getAll.mockResolvedValue([todo]);
            mockApi.update.mockResolvedValue(updatedTodo);

            const result1 = await todoService.toggleStatus(1);

            expect(result1.status).toBe(TodoStatus.IN_PROGRESS);
            expect(mockApi.getAll).toHaveBeenCalledTimes(1);
            expect(mockApi.update).toHaveBeenCalledWith(1, { ...todo, status: TodoStatus.IN_PROGRESS });
        });

        it("should change status from PENDING TO IN_PROGRESS", async () => {
            const todo: Todo = {
                id: 1,
                title: "title",
                description: "description",
                status: TodoStatus.PENDING,
                createdAt: new Date(),
            };

            const updatedTodo = {
                id: 1,
                title: "title",
                description: "description",
                status: TodoStatus.IN_PROGRESS,
                createdAt: new Date(),
            };

            mockApi.getAll.mockResolvedValue([todo]);
            mockApi.update.mockResolvedValue(updatedTodo);

            const result1 = await todoService.toggleStatus(1);

            expect(result1.status).toBe(TodoStatus.IN_PROGRESS);
            expect(mockApi.getAll).toHaveBeenCalledTimes(1);
            expect(mockApi.update).toHaveBeenCalledWith(1, { ...todo, status: TodoStatus.IN_PROGRESS });
        });

        it("should throw error if id not found", async () => {
            mockApi.getAll.mockResolvedValue([]);

            await expect(todoService.toggleStatus(1000)).rejects.toThrow("Todo not found");

            expect(mockApi.update).not.toHaveBeenCalled();
        });

        it("should not mutate an original array", async () => {
            const originalTodo: Todo = {
                id: 1,
                title: "title",
                description: "description",
                createdAt: new Date(),
                status: TodoStatus.IN_PROGRESS,
            };

            const todos = [originalTodo];

            mockApi.getAll.mockResolvedValue(todos);
            mockApi.update.mockResolvedValue({ ...originalTodo, status: TodoStatus.COMPLETED });

            await todoService.toggleStatus(1);

            expect(todos[0].status).toBe(TodoStatus.IN_PROGRESS);
            expect(originalTodo.status).toBe(TodoStatus.IN_PROGRESS);
        });
    });

    describe("search", () => {
        it("should return filtered todos by its title", async () => {
            const todos: Todo[] = [
                {
                    id: 1,
                    title: "title",
                    description: "description",
                    status: TodoStatus.PENDING,
                    createdAt: new Date(),
                },
                {
                    id: 2,
                    title: "Javascript",
                    description: "description2",
                    status: TodoStatus.IN_PROGRESS,
                    createdAt: new Date(),
                },
                {
                    id: 3,
                    title: "nodeJS",
                    description: "something else",
                    status: TodoStatus.COMPLETED,
                    createdAt: new Date(),
                },
            ];

            const filter = "tit";
            mockApi.getAll.mockResolvedValue(todos);
            const filteredTodos = await todoService.search(filter);

            expect(filteredTodos).toEqual([todos[0]]);
            expect(filteredTodos).toHaveLength(1);
            expect(filteredTodos[0].title).toContain("title");
        });

        it("should return filtered todos by its description", async () => {
            const todos: Todo[] = [
                {
                    id: 1,
                    title: "title",
                    description: "description",
                    status: TodoStatus.PENDING,
                    createdAt: new Date(),
                },
                {
                    id: 2,
                    title: "Javascript",
                    description: "programming language",
                    status: TodoStatus.IN_PROGRESS,
                    createdAt: new Date(),
                },
                {
                    id: 3,
                    title: "nodeJS",
                    description: "crossplatform environment",
                    status: TodoStatus.COMPLETED,
                    createdAt: new Date(),
                },
            ];

            const filter = "desc";
            mockApi.getAll.mockResolvedValue(todos);
            const filteredTodos = await todoService.search(filter);

            expect(filteredTodos).toEqual([todos[0]]);
            expect(filteredTodos).toHaveLength(1);
            expect(filteredTodos[0].description).toContain("description");
        });

        it("should return filtered todos case-insensitively", async () => {
            const todos: Todo[] = [
                {
                    id: 1,
                    title: "title",
                    description: "description",
                    status: TodoStatus.PENDING,
                    createdAt: new Date(),
                },
                {
                    id: 2,
                    title: "Javascript",
                    description: "programming language",
                    status: TodoStatus.IN_PROGRESS,
                    createdAt: new Date(),
                },
                {
                    id: 3,
                    title: "nodeJS",
                    description: "crossplatform environment",
                    status: TodoStatus.COMPLETED,
                    createdAt: new Date(),
                },
            ];

            const filter = "ITL";
            mockApi.getAll.mockResolvedValue(todos);
            const filteredTodos = await todoService.search(filter);

            expect(filteredTodos).toEqual([todos[0]]);
            expect(filteredTodos).toHaveLength(1);
            expect(filteredTodos[0].title).toContain("title");
        });

        it("should return whole todo list if keyword is empty", async () => {
            const todos: Todo[] = [
                {
                    id: 1,
                    title: "title",
                    description: "description",
                    status: TodoStatus.PENDING,
                    createdAt: new Date(),
                },
                {
                    id: 2,
                    title: "title2",
                    description: "description2",
                    status: TodoStatus.IN_PROGRESS,
                    createdAt: new Date(),
                },
                {
                    id: 3,
                    title: "title3",
                    description: "something else",
                    status: TodoStatus.COMPLETED,
                    createdAt: new Date(),
                },
            ];

            const filter = "";

            mockApi.getAll.mockResolvedValue(todos);

            const searchedTodos = await todoService.search(filter);

            expect(searchedTodos).toEqual(todos);
            expect(searchedTodos).toHaveLength(todos.length);
        });

        it("should return whole todo list if keyword is just a whitespace", async () => {
            const todos: Todo[] = [
                {
                    id: 1,
                    title: "title",
                    description: "description",
                    status: TodoStatus.PENDING,
                    createdAt: new Date(),
                },
                {
                    id: 2,
                    title: "title2",
                    description: "description2",
                    status: TodoStatus.IN_PROGRESS,
                    createdAt: new Date(),
                },
                {
                    id: 3,
                    title: "title3",
                    description: "something else",
                    status: TodoStatus.COMPLETED,
                    createdAt: new Date(),
                },
            ];

            const filter = "    ";

            mockApi.getAll.mockResolvedValue(todos);

            const searchedTodos = await todoService.search(filter);

            expect(searchedTodos).toEqual(todos);
            expect(searchedTodos).toHaveLength(todos.length);
        });
    });
});
