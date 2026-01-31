import React, { useState, useEffect } from "react";
import { Todo } from "../../types";
import { ToDoList } from "../task01/TodoList.tsx";

type FetchTodosProps = { markCompleted: (id: number) => void };

export const FetchTodos: React.FC<FetchTodosProps> = ({ markCompleted }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div>
            {!loading ? (
                error === null ? (
                    <ToDoList todos={todos} markCompleted={markCompleted} />
                ) : (
                    <p>{error}</p>
                )
            ) : (
                <p>loading</p>
            )}
        </div>
    );
};
