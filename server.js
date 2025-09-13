require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const path = require("path");

const app = express();
const DEFAULT_PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:".red, err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL Database".green.bold);
});

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Events APIs
app.get("/events", (req, res) => {
  db.query("SELECT * FROM events", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

app.post("/events", (req, res) => {
  const { name, date, location } = req.body;
  if (!name || !date || !location)
    return res.status(400).json({ error: "All fields are required" });

  db.query(
    "INSERT INTO events (name, date, location) VALUES (?, ?, ?)",
    [name, date, location],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "✅ Event added successfully!", id: result.insertId });
    }
  );
});

// Users APIs
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

app.post("/users", (req, res) => {
  const { username, email } = req.body;
  if (!username || !email)
    return res.status(400).json({ error: "All fields are required" });

  db.query(
    "INSERT INTO users (username, email) VALUES (?, ?)",
    [username, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "✅ User added successfully!", id: result.insertId });
    }
  );
});

// Dynamic port handler
function startServer(port) {
  const server = app.listen(port, () => {
    console.log(
      `🚀 Server running on `.cyan + `http://localhost:${port}`.yellow.bold
    );
  });

  server.on("error", err => {
    if (err.code === "EADDRINUSE") {
      console.log(`⚠️  Port ${port} is busy, trying next port...`.magenta);
      startServer(port + 1);
    } else {
      console.error("❌ Server error:".red, err);
    }
  });
}

startServer(Number(DEFAULT_PORT));
