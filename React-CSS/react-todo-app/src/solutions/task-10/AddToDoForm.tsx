import React, { useState } from "react";
import { Todo } from "../../types";
import { ToDoList } from "../task-01/ToDoList";
import cl from "./AddToDoForm.module.css";

export const AddToDoForm: React.FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, title: "1", completed: false },
        { id: 2, title: "2", completed: false },
        { id: 3, title: "3", completed: false },
    ]);
    const addTodo = (title: string) => {
        const maxId = todos.length === 0 ? 0 : Math.max(...todos.map(todo => todo.id));

        setTodos(todos => [...todos, { title, id: maxId + 1, completed: false }]);
    };

    return (
        <div>
            <div>
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
            </div>
            <ToDoList todos={todos} />
        </div>
    );
};
