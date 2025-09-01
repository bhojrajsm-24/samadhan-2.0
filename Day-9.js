//task-9 of hackthon....
///frontend :-
import React, { useEffect, useState } from "react";

export default function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  // fetch students from backend
  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  // add student
  const addStudent = async () => {
    if (!name || !course) return;
    const res = await fetch("http://localhost:5000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, course }),
    });
    const newStudent = await res.json();
    setStudents([...students, newStudent]);
    setName("");
    setCourse("");
  };

  // delete student
  const deleteStudent = async (id) => {
    await fetch(`http://localhost:5000/students/${id}`, { method: "DELETE" });
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>📘 Student Directory</h2>

      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        placeholder="Enter Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button onClick={addStudent}>Add Student</button>

      <ul style={{ listStyle: "none", marginTop: "20px" }}>
        {students.map((s) => (
          <li key={s.id} style={{ marginBottom: "10px" }}>
            {s.name} - {s.course}{" "}
            <button onClick={() => deleteStudent(s.id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/// backend :-

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory DB
let students = [
  { id: 1, name: "Rahul Sharma", course: "CSE" },
  { id: 2, name: "Priya Verma", course: "AI-DS" },
];

// GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// ADD student
app.post("/students", (req, res) => {
  const { name, course } = req.body;
  const newStudent = { id: students.length + 1, name, course };
  students.push(newStudent);
  res.json(newStudent);
});

// DELETE student
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter((s) => s.id !== id);
  res.json({ message: "Student deleted" });
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));



