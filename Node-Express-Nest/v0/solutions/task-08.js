// Express.js static files serving for ToDo frontend
// TODO: implement
const path = require("path");
const express = require("express");

const app = express();

app.use("/static", express.static(path.join(__dirname, "public")));

module.exports = {};
