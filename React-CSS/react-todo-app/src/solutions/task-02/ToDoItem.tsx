import React from "react";
import { Todo } from "../../types";
import cl from "./ToDoItem.module.css";

interface ToDoItemProps {
    todo: Todo;
}

export const ToDoItem: React.FC<ToDoItemProps> = ({ todo }) => {
    return (
        <li className={cl.todoItem}>
            <div className={cl.todoItem_info}>
                <p className={cl.todoItem_title}>{todo.title}</p>
                <p className={cl.todoItem_status}>{todo.completed ? "completed" : "not completed"}</p>
            </div>
            <button className={`${cl.todoItem_completeBtn} ${todo.completed ? cl.completed : ""}`}>complete</button>
        </li>
    );
};
