import React from "react";
import { ToDoItem } from "../task02/TodoItem.tsx";
import { Todo } from "../../types";
import "./StyledToDoItem.css";

type StyledToDoItemProps = { todo: Todo; markCompleted: (id: number) => void };

export const StyledToDoItem: React.FC<StyledToDoItemProps> = ({ todo, markCompleted }) => {
    const itemClass = `todo-item ${todo.completed ? "completed" : ""}`;

    return <ToDoItem className={itemClass} todo={todo} markCompleted={markCompleted} />;
};
