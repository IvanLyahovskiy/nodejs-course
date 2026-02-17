import React, { useContext } from "react";
import { ToDoItem } from "../task-02/ToDoItem";
import { TodoListProps } from "../../types";
import cl from "./ToDoList.module.css";

export const ToDoList: React.FC<TodoListProps> = ({ todos }) => {
    return (
        <div className={cl.todoList}>
            <h3 className={cl.todoList_title}>Todo List</h3>
            <ul className={cl.todoList_container}>
                {todos.map((todo, ind) => (
                    <ToDoItem todo={todo} key={ind} />
                ))}
            </ul>
        </div>
    );
};
