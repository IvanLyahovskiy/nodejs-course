import React from "react";
import { ToDoItem } from "../task-02/ToDoItem";
import { Todo } from "../../types";
import "./StyledToDoItem.css";

interface StyledToDoItemProps {
    todo: Todo;
}

export const StyledToDoItem: React.FC<StyledToDoItemProps> = ({ todo }) => {
    const itemClass = `todo-item ${todo.completed ? "completed" : ""}`;

    return (
        <li className={itemClass}>
            <p>{todo.title}</p>
            <p>{todo.completed ? "completed" : "not completed"}</p>
            <button>complete</button>
        </li>
    );
};
