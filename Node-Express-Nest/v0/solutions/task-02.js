// Express.js app with POST /todos endpoint
const express = require("express");
const app = express();
const todos = require("./express-app/todos");
const dotenv = require("dotenv");

app.use(dotenv());
app.use(express.json());

app.post("/todos", (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "title cannot be empty" });
    }
    todos.push({ id: Date.now(), title, completed: false });
    return res.status(200).json(todos);
});

app.listen(PORT || 3000, () => {
    console.log("server is working successfully");
});

// TODO: implement todos storage and POST /todos logic

module.exports = app;
