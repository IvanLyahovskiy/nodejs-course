import React, { useState, useEffect } from "react";
import { Todo } from "../../types";
import { ToDoList } from "../task-01/ToDoList";

export const FetchTodos: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, title: "1", completed: false },
        { id: 2, title: "2", completed: false },
        { id: 3, title: "3", completed: false },
    ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const markCompleted = (id: number) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(res => res.json())
            .then(data => {
                setTodos(data.slice(0, 5));
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return <div>{!loading ? error === null ? <ToDoList todos={todos} /> : <p>{error}</p> : <p>loading</p>}</div>;
};
