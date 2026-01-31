import React, { useState } from "react";
import { Todo, TodoListProps } from "../../types";
import { ToDoList } from "../task01/TodoList.tsx";

type CompleteTodoList = { todos: Todo[]; markCompleted: (id: number) => void };

export const CompleteTodoList: React.FC<CompleteTodoList> = ({ todos, markCompleted }) => {
    return (
        <div>
            <ToDoList todos={todos} markCompleted={markCompleted} />
        </div>
    );
};
