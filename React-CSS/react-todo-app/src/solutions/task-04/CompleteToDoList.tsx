import React, { useState } from "react";
import { Todo, TodoListProps } from "../../types";
import { ToDoList } from "../task-01/ToDoList";
import cl from "./CompleteToDoList.module.css";

export const CompleteToDoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, title: "Learn React", completed: false },
        { id: 2, title: "Build Todo App", completed: true },
        { id: 3, title: "Write Tests", completed: false },
    ]);

    const markCompleted = (id: number) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };
    return (
        <div className={cl.completeTodoList}>
            <ul className={cl.completeTodoList_container}>
                {todos.map(todo => (
                    <li className={cl.todoItem}>
                        <div className={cl.todoItem_info}>
                            <p className={cl.todoItem_title}>{todo.title}</p>
                            <p className={cl.todoItem_status}>{todo.completed ? "completed" : "not completed"}</p>
                        </div>
                        <button
                            onClick={() => markCompleted(todo.id)}
                            className={`${cl.todoItem_completeBtn} ${todo.completed ? cl.completed : ""}`}>
                            complete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
