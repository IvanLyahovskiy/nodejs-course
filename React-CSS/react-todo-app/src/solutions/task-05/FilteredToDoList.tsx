import React, { useMemo, useState } from "react";
import { Todo } from "../../types";
import { AddToDo } from "../task-03/AddToDo";
import cl from "./FilteredToDoList.module.css";

export const FilteredToDoList: React.FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, title: "1", completed: false },
        { id: 2, title: "2", completed: false },
        { id: 3, title: "3", completed: false },
    ]);

    const addTodo = (title: string) => {
        if (!title.trim()) {
            return;
        }
        const maxId = todos.length === 0 ? 0 : Math.max(...todos.map(todo => todo.id));

        setTodos(todos => [...todos, { title, id: maxId + 1, completed: false }]);
    };

    const [filterSettings, setFilterSettings] = useState<"all" | "active" | "completed">("all");

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterSettings(e.target.value as "all" | "active" | "completed");
    };

    const markCompleted = (id: number) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    const filteredTodos = useMemo(() => {
        return todos.filter(todo => {
            switch (filterSettings) {
                case "all":
                    return true;
                case "active":
                    return !todo.completed;
                case "completed":
                    return todo.completed;
                default:
                    return true;
            }
        });
    }, [filterSettings, todos]);

    return (
        <div className={cl.filteredTodoList}>
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
            <select name="todosFilter" value={filterSettings} onChange={handleFilterChange}>
                <option value="all">all</option>
                <option value="active">active</option>
                <option value="completed">completed</option>
            </select>
            <ul className={cl.filteredTodoList}>
                {filteredTodos.map((todo, ind) => (
                    <li key={ind} className={cl.todoItem}>
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
