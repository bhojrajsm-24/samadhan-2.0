//task-13 of hackathon ....

//frontemd :-

import React, { useState, useEffect } from "react";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch notes
  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  // Add or Update note
  const saveNote = async () => {
    if (!title.trim() || !content.trim()) return;

    if (editingId) {
      // Update note
      const res = await fetch(`http://localhost:5000/notes/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const updated = await res.json();
      setNotes(notes.map(n => (n.id === editingId ? updated : n)));
      setEditingId(null);
    } else {
      // Add new note
      const res = await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const newNote = await res.json();
      setNotes([...notes, newNote]);
    }

    setTitle("");
    setContent("");
  };

  // Edit note
  const editNote = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  // Delete note
  const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/notes/${id}`, { method: "DELETE" });
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>📒 Notes App</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        style={{ display: "block", marginBottom: "8px" }}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows="4"
        style={{ display: "block", marginBottom: "8px", width: "250px" }}
      />
      <button onClick={saveNote}>
        {editingId ? "Update Note" : "Add Note"}
      </button>

      <ul style={{ marginTop: "20px" }}>
        {notes.map((note) => (
          <li key={note.id} style={{ marginBottom: "10px" }}>
            <strong>{note.title}</strong>
            <p>{note.content}</p>
            <button onClick={() => editNote(note)}>✏️ Edit</button>
            <button onClick={() => deleteNote(note.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

//backend :-
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let notes = [];
let idCounter = 1;

// CREATE - Add note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  const note = { id: idCounter++, title, content };
  notes.push(note);
  res.status(201).json(note);
});

// READ - Get all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// READ - Get note by ID
app.get("/notes/:id", (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(note);
});

// UPDATE - Edit note
app.put("/notes/:id", (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) return res.status(404).json({ message: "Note not found" });

  const { title, content } = req.body;
  note.title = title || note.title;
  note.content = content || note.content;

  res.json(note);
});

// DELETE - Remove note
app.delete("/notes/:id", (req, res) => {
  const index = notes.findIndex(n => n.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Note not found" });

  const deleted = notes.splice(index, 1);
  res.json(deleted);
});

// Start server
app.listen(5000, () => {
  console.log("✅ Notes API running on http://localhost:5000");
});
