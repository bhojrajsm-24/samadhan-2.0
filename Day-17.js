//task-17 of hackathon...
//backend :-
// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, "public")));

// Socket.io logic
io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("chatMessage", (msg) => {
        io.emit("chatMessage", msg); // Broadcast to all clients
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// frontend :-

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Real-Time Chat</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f9; text-align: center; }
    #chat-box { width: 60%; margin: 20px auto; padding: 10px; border: 1px solid #ccc; background: #fff; height: 400px; overflow-y: auto; }
    input { padding: 10px; width: 70%; }
    button { padding: 10px; }
    .msg { text-align: left; margin: 5px; }
  </style>
</head>
<body>
  <h2>💬 Real-Time Chat App</h2>
  <div id="chat-box"></div>
  <input id="msg" type="text" placeholder="Type your message...">
  <button onclick="sendMessage()">Send</button>

  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io();
    const chatBox = document.getElementById("chat-box");

    socket.on("chatMessage", (msg) => {
      const div = document.createElement("div");
      div.className = "msg";
      div.textContent = msg;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
    });

    function sendMessage() {
      const msg = document.getElementById("msg").value;
      if(msg.trim() !== ""){
        socket.emit("chatMessage", msg);
        document.getElementById("msg").value = "";
      }
    }
  </script>
</body>
</html>
