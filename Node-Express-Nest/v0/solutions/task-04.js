// Express.js app with GET /todos/:id endpoint
const express = require("express");
const app = express();
const todos = require("./express-app/todos");

// TODO: implement todos storage and GET /todos/:id logic

app.get("/todos/:id", (req, res) => {
    const existingTodo = todos.find(todo => todo.id === parseInt(req.params.id));
    if (!existingTodo) {
        return res.status(404).json({ message: "todo not found" });
    }
    return res.status(200).json(existingTodo);
});

module.exports = app;
