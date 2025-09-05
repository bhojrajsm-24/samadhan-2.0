//task-18 of hackathon...

import React, { useState } from "react";

function App() {
  const [boards, setBoards] = useState([
    { id: 1, name: "To Do", tasks: [] },
    { id: 2, name: "In Progress", tasks: [] },
    { id: 3, name: "Done", tasks: [] }
  ]);
  const [task, setTask] = useState("");

  const addTask = (boardId) => {
    if (!task.trim()) return;
    setBoards(
      boards.map((b) =>
        b.id === boardId ? { ...b, tasks: [...b.tasks, task] } : b
      )
    );
    setTask("");
  };

  const moveTask = (fromBoard, toBoard, taskIndex) => {
    const taskToMove = boards[fromBoard].tasks[taskIndex];
    const newBoards = [...boards];
    newBoards[fromBoard].tasks.splice(taskIndex, 1);
    newBoards[toBoard].tasks.push(taskToMove);
    setBoards(newBoards);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📋 Trello Clone</h1>
      <div className="grid grid-cols-3 gap-4">
        {boards.map((board, boardIndex) => (
          <div key={board.id} className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-semibold mb-3">{board.name}</h2>

            <ul>
              {board.tasks.map((t, taskIndex) => (
                <li
                  key={taskIndex}
                  className="p-2 bg-gray-200 rounded mb-2 flex justify-between"
                >
                  {t}
                  <div className="space-x-1">
                    {boardIndex > 0 && (
                      <button
                        className="px-2 bg-blue-500 text-white rounded"
                        onClick={() =>
                          moveTask(boardIndex, boardIndex - 1, taskIndex)
                        }
                      >
                        ◀
                      </button>
                    )}
                    {boardIndex < boards.length - 1 && (
                      <button
                        className="px-2 bg-green-500 text-white rounded"
                        onClick={() =>
                          moveTask(boardIndex, boardIndex + 1, taskIndex)
                        }
                      >
                        ▶
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-3">
              <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="New Task..."
                className="border p-2 w-full rounded mb-2"
              />
              <button
                onClick={() => addTask(board.id)}
                className="bg-purple-600 text-white px-3 py-1 rounded"
              >
                ➕ Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
