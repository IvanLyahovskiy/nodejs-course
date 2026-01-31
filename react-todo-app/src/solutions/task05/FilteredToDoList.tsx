import React, { useState } from "react";
import { Todo } from "../../types";
import { CompleteTodoList } from "../task04/CompleteTodoList.tsx";
import { AddToDo } from "../task03/AddToDo.tsx";

type FilteredToDoListProps = {
    addTodo: (title: string) => void;
    filteredTodos: Todo[];
    filterSettings: "all" | "active" | "completed";
    handleFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    markCompleted: (id: number) => void;
};

export const FilteredToDoList: React.FC<FilteredToDoListProps> = ({
    addTodo,
    filteredTodos,
    filterSettings,
    handleFilterChange,
    markCompleted,
}) => {
    return (
        <div>
            <AddToDo addTodo={addTodo} />
            <select name="todosFilter" value={filterSettings} onChange={handleFilterChange}>
                <option value="all">all</option>
                <option value="active">active</option>
                <option value="completed">completed</option>
            </select>
            <CompleteTodoList todos={filteredTodos} markCompleted={markCompleted} />
        </div>
    );
};
