import React, { useState } from "react";
import { Todo } from "../../types";
import { ToDoList } from "../task-01/ToDoList";

interface ActiveCountProps {
    todos: Todo[];
}

export const ActiveCount: React.FC<ActiveCountProps> = ({ todos }) => {
    const activeCount = todos.filter(todo => !todo.completed).length;

    return (
        <div>
            {activeCount > 0 ? (
                <p>You have only {activeCount} todos left. You can do it!</p>
            ) : (
                <p>All tasks are done. Congratulations!!</p>
            )}
        </div>
    );
};
