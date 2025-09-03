// task-12 of hackathon ...
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let todos = [];
let idCounter = 1;

// CREATE - Add a todo
app.post("/todos", (req, res) => {
  const { text } = req.body;
  const todo = { id: idCounter++, text, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// READ - Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// UPDATE - Toggle completed or edit text
app.put("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  const { text, completed } = req.body;
  if (text !== undefined) todo.text = text;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// DELETE - Remove todo
app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  const deleted = todos.splice(index, 1);
  res.json(deleted);
});

// Start server
app.listen(5000, () => {
  console.log("✅ To-Do API running on http://localhost:5000");
});
