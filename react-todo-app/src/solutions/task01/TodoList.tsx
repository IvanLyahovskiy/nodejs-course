import React from "react";
import { ToDoItem } from "../task02/TodoItem.tsx";
import { Todo } from "../../types/index.ts";
import { StyledToDoItem } from "../task07/StyledToDoItem.tsx";

type TodoListProps = { todos: Todo[]; markCompleted: (id: number) => void };

export const ToDoList: React.FC<TodoListProps> = ({ todos, markCompleted }) => {
    return (
        <div>
            <h3>Todo List</h3>
            <ul>
                {todos.map((todo, ind) => (
                    <StyledToDoItem markCompleted={markCompleted} todo={todo} key={ind} />
                ))}
            </ul>
        </div>
    );
};
