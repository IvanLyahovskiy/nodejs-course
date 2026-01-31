import React, { useState } from "react";
import { Todo } from "../../types";

type AddToDoProps = { addTodo: (title: string) => void };

export const AddToDo: React.FC<AddToDoProps> = ({ addTodo }) => {
    const [inputValue, setInputValue] = useState("");

    return (
        <div>
            <input
                type="text"
                placeholder="enter todo title"
                value={inputValue}
                onChange={e => {
                    setInputValue(e.target.value);
                }}
            />
            <button
                onClick={e => {
                    e.preventDefault();
                    addTodo(inputValue);
                    setInputValue("");
                }}>
                add
            </button>
        </div>
    );
};
