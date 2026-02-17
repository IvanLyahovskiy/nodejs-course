const express = require("express");
const todos = require("./todos.js");
const path = require("path");
const app = express();
const loggingMiddleware = require("../task-03.js");
const todoRoutes = require("./routes/todoRoutes.js");
const errorHandlingMiddleware = require("../task-07.js");

app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(loggingMiddleware);
app.use("/todos", todoRoutes);

// TODO: Add routes and middleware here
app.get("/", (req, res) => {
    res.send("Express ToDo App Template");
});

// app.get("/todos", (req, res) => {
//     return res.status(200).json(todos);
// });

// app.post("/posttodos", (req, res) => {
//     const { title } = req.body;
//     if (!title) {
//         return res.status(400).json({ message: "title cannot be empty" });
//     }
//     const newTodo = { id: Date.now(), title, completed: false };
//     todos.push(newTodo);
//     return res.status(200).json(newTodo);
// });

// app.get("/todos/:id", (req, res) => {
//     const existingTodo = todos.find(todo => todo.id === parseInt(req.params.id));
//     if (!existingTodo) {
//         return res.status(404).json({ message: "todo not found" });
//     }
//     return res.status(200).json(existingTodo);
// });

app.use(errorHandlingMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}`);
});
