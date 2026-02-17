// NestJS Service for ToDos
export class TodosService {
    private todos: TodoDto[] = [
        { id: 1, title: " todo1", completed: false },
        { id: 2, title: " completed todo", completed: true },
        { id: 3, title: " uncompleted todo", completed: false },
    ];

    getTodos(): TodoDto[] {
        return this.todos;
    }

    addTodo(title: string) {
        if (!title.trim()) {
            throw new Error("Title cannot be empty");
        }
        return this.todos.push({ id: Date.now(), title, completed: false });
    }

    markAsCompleted(id: number): TodoDto {
        const existingTodoInd = this.todos.findIndex(todo => todo.id === id);
        if (existingTodoInd === -1) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        this.todos[existingTodoInd].completed = true;
        return this.todos[existingTodoInd];
    }

    getTodoById(id: number): TodoDto {
        const existingTodo = this.todos.find(todo => todo.id === id);
        if (!existingTodo) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        return existingTodo;
    }

    getTodosByQueryParams(query: TodoQueryDto): TodoDto[] {
        if (!query) {
            return this.todos;
        }
        return this.todos.filter(todo => {
            if (query.id !== undefined && todo.id !== query.id) return false;
            if (query.completed !== undefined && query.completed !== todo.completed) return false;
            if (query.title !== undefined) {
                if (!todo.title.toLowerCase().includes(query.title.toLowerCase())) return false;
            }

            return true;
        });
    }
}
