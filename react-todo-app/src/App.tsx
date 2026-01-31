import React, { useEffect, useMemo, useState } from "react";
import { ToDoList } from "./solutions/task01/TodoList.tsx";
import { Todo } from "./types/index.ts";
import { AddToDo } from "./solutions/task03/AddToDo.tsx";
import { CompleteTodoList } from "./solutions/task04/CompleteTodoList.tsx";
import { FilteredToDoList } from "./solutions/task05/FilteredToDoList.tsx";
import { ActiveCount } from "./solutions/task06/ActiveCount.tsx";
import { FetchTodos } from "./solutions/task08/FetchTodos.tsx";
import { Card } from "./solutions/task09/Card.tsx";
import { AddToDoForm } from "./solutions/task10/AddToDoForm.tsx";

function App() {
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, title: "1", completed: false },
        { id: 2, title: "2", completed: false },
        { id: 3, title: "3", completed: false },
    ]);

    const addTodo = (title: string): void => {
        if (title.trim() === "") return;

        const maxId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

        setTodos(todos => [...todos, { title, id: maxId + 1, completed: false }]);
    };

    const markCompleted = (id: number) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    const [filterSettings, setFilterSettings] = useState<"all" | "active" | "completed">("all");

    const filteredTodos = useMemo(() => {
        return todos.filter(todo => {
            switch (filterSettings) {
                case "all":
                    return true;
                case "active":
                    return !todo.completed;
                case "completed":
                    return todo.completed;
                default:
                    return true;
            }
        });
    }, [filterSettings, todos]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterSettings(e.target.value as "all" | "active" | "completed");
    };

    return (
        <div className="App">
            {/* <CompleteTodoList todos={filteredTodos} markCompleted={markCompleted} /> */}
            {/* <ActiveCount todos={todos} />
            <FilteredToDoList
                filteredTodos={filteredTodos}
                filterSettings={filterSettings}
                handleFilterChange={handleFilterChange}
                addTodo={addTodo}
                markCompleted={markCompleted}
            /> */}
            {/* 
            <FetchTodos markCompleted={markCompleted} /> */}
            <AddToDoForm addTodo={addTodo} />
            <Card>
                <ToDoList markCompleted={markCompleted} todos={todos} />
            </Card>
        </div>
    );
}

export default App;
