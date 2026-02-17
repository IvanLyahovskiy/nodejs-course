enum TodoStatus {
    PENDING,
    IN_PROGRESS,
    COMPLETED,
}

interface Todo {
    id: number;
    title: string;
    description?: string;
    status: TodoStatus;
    createdAt: Date;
}

type NewTodo = Omit<Todo, "id" | "createdAt">;

export { Todo, NewTodo, TodoStatus };
