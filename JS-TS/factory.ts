import { Todo, NewTodo, TodoStatus } from "./types";

let nextId = 1;

export function createTodo(input: Omit<NewTodo, "status">): Todo {
    if (input.title.trim() === "") {
        throw new Error("createTodo: not implemented");
    }

    const id = nextId++;

    return {
        title: input.title,
        description: input.description,
        id,
        createdAt: new Date(),
        status: TodoStatus.PENDING,
    };
}
