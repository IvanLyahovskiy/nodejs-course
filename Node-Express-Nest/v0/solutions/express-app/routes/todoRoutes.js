const express = require("express");
const router = express.Router();
const todos = require("../todos.js");

router.get("/gettodos", (req, res) => {
    return res.status(200).json(todos);
});

router.post("/posttodos", (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "title cannot be empty" });
    }
    const newTodo = { id: Date.now(), title, completed: false };
    todos.push(newTodo);
    return res.status(200).json(newTodo);
});

router.get("/todos/:id", (req, res) => {
    const existingTodo = todos.find(todo => todo.id === parseInt(req.params.id));
    if (!existingTodo) {
        return res.status(404).json({ message: "todo not found" });
    }
    return res.status(200).json(existingTodo);
});

router.get("/search", (req, res) => {
    const { id, completed, title } = req.query;

    const parseCompeltedField = completed => {
        if (completed === "true") {
            return true;
        } else if (completed === "false") {
            return false;
        } else {
            return "";
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (id !== undefined && parseInt(id, 10) !== todo.id) return false;
        if (completed !== undefined && parseCompeltedField(completed) !== todo.completed) return false;
        if (title !== undefined && !todo.title.toLowerCase().includes(title.toLowerCase())) return false;
        return true;
    });

    return res.status(200).json(filteredTodos);
});

module.exports = router;
