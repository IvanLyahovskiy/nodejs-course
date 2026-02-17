import { Todo } from "./types";

export function addTodo(state: Todo[], todo: Todo): Todo[] {
    if (todo.title === "") {
        throw new Error("addTodo: not implemented");
    }

    return [...state, todo];
}

export function updateTodo(state: Todo[], id: number, update: Partial<Omit<Todo, "id" | "createdAt">>): Todo[] {
    const index = state.findIndex(todo => todo.id === id);

    if (index === -1) {
        throw new Error("updateTodo: not implemented");
    }

    return state.map((item, i) => {
        if (index === i) {
            return { ...item, ...update, id: item.id, createdAt: item.createdAt };
        }
        return item;
    });
}

export function removeTodo(state: Todo[], id: number): Todo[] {
    if (!state.find(item => item.id === id)) {
        throw new Error("removeTodo: not implemented");
    }

    return state.filter(item => item.id !== id);
}

export function getTodo(state: Todo[], id: number): Todo | undefined {
    // throw new Error("getTodo: not implemented");
    return state.find(item => item.id === id);
}
