// task-11 of hackathon..
// filename: server.js
const express = require("express");
const app = express();
app.use(express.json());

let students = []; // temporary in-memory database
let idCounter = 1;

// CREATE - Add new student
app.post("/students", (req, res) => {
  const { name, age, course } = req.body;
  const student = { id: idCounter++, name, age, course };
  students.push(student);
  res.status(201).json(student);
});

// READ - Get all students
app.get("/students", (req, res) => {
  res.json(students);
});

// READ - Get student by ID
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

// UPDATE - Update student by ID
app.put("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });

  const { name, age, course } = req.body;
  student.name = name || student.name;
  student.age = age || student.age;
  student.course = course || student.course;

  res.json(student);
});

// DELETE - Remove student by ID
app.delete("/students/:id", (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Student not found" });

  const deletedStudent = students.splice(index, 1);
  res.json(deletedStudent);
});

// Start server
app.listen(5000, () => {
  console.log("✅ Student CRUD API running on http://localhost:5000");
});
