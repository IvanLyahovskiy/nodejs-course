import React, { useState } from "react";
import { Todo } from "../../types";
import { ToDoList } from "../task-01/ToDoList";
import cl from "./AddToDo.module.css";

export const AddToDo: React.FC = () => {
    const [inputValue, setInputValue] = useState("");

    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, title: "Learn React", completed: false },
        { id: 2, title: "Build Todo App", completed: true },
        { id: 3, title: "Write Tests", completed: false },
    ]);

    const addTodo = (title: string) => {
        if (!title.trim()) {
            return;
        } else {
            setTodos(prevTodos => [...prevTodos, { id: Date.now(), title, completed: false }]);
            setInputValue("");
        }
    };

    return (
        <div className={cl.addTodo}>
            <form className={cl.addTodo_form}>
                <input
                    type="text"
                    placeholder="Add todo"
                    value={inputValue}
                    className={cl.addTodo_input}
                    onChange={e => {
                        setInputValue(e.target.value);
                    }}
                />
                <button
                    className={cl.addTodo_btn}
                    onClick={e => {
                        e.preventDefault();
                        addTodo(inputValue);
                        setInputValue("");
                    }}>
                    Add
                </button>
            </form>
            <ToDoList todos={todos}></ToDoList>
        </div>
    );
};
