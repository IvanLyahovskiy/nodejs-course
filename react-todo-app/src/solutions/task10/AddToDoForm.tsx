import React, { useState } from "react";
import { Todo } from "../../types";

type AddToDoFormProps = { addTodo: (title: string) => void };

export const AddToDoForm: React.FC<AddToDoFormProps> = ({ addTodo }) => {
    const [inputValue, setInputValue] = useState("");

    return (
        <form>
            <input
                type="text"
                placeholder="Add todo"
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
        </form>
    );
};
