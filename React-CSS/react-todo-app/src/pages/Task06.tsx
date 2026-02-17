import React, { useState } from "react";
import TaskWrapper from "./TaskWrapper";
import { ActiveCount } from "../solutions/task-06/ActiveCount";
import { Todo } from "../types";
import { ToDoList } from "../solutions/task-01/ToDoList";

const Task06: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, title: "Active Task 1", completed: false },
        { id: 2, title: "Completed Task", completed: true },
        { id: 3, title: "Active Task 2", completed: false },
    ]);

    return (
        <TaskWrapper title="Task 6: Active Count">
            <ActiveCount todos={todos} />
            <ToDoList todos={todos} />
        </TaskWrapper>
    );
};

export default Task06;
