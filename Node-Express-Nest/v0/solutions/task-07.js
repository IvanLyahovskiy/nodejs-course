// Express.js error handler middleware for ToDo API
// TODO: implement

function errorHandlingMiddleware(err, req, res, next) {
    console.error("error :", err.message);
    res.status(err.status || 500).json({ error: err.message });
}

module.exports = errorHandlingMiddleware;
