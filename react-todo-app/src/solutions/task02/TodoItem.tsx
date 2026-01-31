import React from "react";
import { Todo } from "../../types";

type TodoItemProps = { todo: Todo; markCompleted: (id: number) => void; className?: string };

export const ToDoItem: React.FC<TodoItemProps> = ({ todo, markCompleted, className }) => {
    return (
        <li className={className}>
            <p>{todo.title}</p>
            <p>{todo.completed ? "completed" : "not completed"}</p>
            <button
                onClick={e => {
                    e.preventDefault();
                    markCompleted(todo.id);
                }}>
                complete
            </button>
        </li>
    );
};
