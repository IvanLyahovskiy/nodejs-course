// Express.js app with GET /todos endpoint
const express = require("express");
const app = express();
const todos = require("./express-app/todos");

// TODO: implement todos storage and GET /todos logic

app.use(express.json());

app.get("/todos", (req, res) => {
    return res.status(200).json(todos);
});
module.exports = app;
