// Express.js GET /todos/search endpoint with query params
// TODO: implement
const todos = require("./express-app/todos");

app.get("/search", (req, res) => {
    const { id, completed, title } = req.query;
    const parseCompeltedField = completed => {
        if (completed === "true") {
            return true;
        } else if (completed === "false") {
            return false;
        } else return "";
    };

    const filteredTodos = todos.filter(todo => {
        if (id !== undefined && parseInt(id, 10) !== todo.id) return false;
        if (completed !== undefined && parseCompeltedField(completed) !== todo.completed) return false;
        if (title !== undefined && !todo.title.toLowerCase().includes(title.toLowerCase())) return false;
        return true;
    });

    return res.status(200).json(filteredTodos);
});

module.exports = {};
