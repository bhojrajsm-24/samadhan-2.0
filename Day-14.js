//task-14 of hackathon....
// backend only :-
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = []; // temporary in-memory storage
const SECRET_KEY = "mysecretkey"; // production me env variable me rakho

// REGISTER
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // check if already exists
  const existing = users.find(u => u.username === username);
  if (existing) return res.status(400).json({ message: "User already exists" });

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { id: users.length + 1, username, password: hashedPassword };
  users.push(user);

  res.status(201).json({ message: "User registered successfully" });
});

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "Invalid username or password" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

  // generate token
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
});

// Protected route example
app.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token required" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: "Profile accessed", user: decoded });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Start server
app.listen(5000, () => {
  console.log("✅ Auth API running on http://localhost:5000");
});
