// task-8 of hackathon......
import React, { useState } from "react";

export default function TodoApp() {
  const [task, setTask] = useState(""); // input state
  const [tasks, setTasks] = useState([]); // list state

  // add task function
  const addTask = () => {
    if (task.trim() === "") return; // empty task avoid
    setTasks([...tasks, task]);
    setTask(""); // input clear
  };

  // delete task function
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>My To-Do List</h2>

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task..."
      />
      <button onClick={addTask} style={{ marginLeft: "10px" }}>
        Add
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((t, index) => (
          <li key={index} style={{ marginTop: "10px" }}>
            {t}{" "}
            <button onClick={() => deleteTask(index)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
