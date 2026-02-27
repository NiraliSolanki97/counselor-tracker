const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const http = require("http");

const app = express();
app.use(cors());
app.use(express.json());

// HTTP server + Socket.IO
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" }
});

// Connect to SQLite
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) console.error("Database error:", err.message);
  else console.log("Connected to SQLite database");
});

// Create table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      counselor TEXT,
      date TEXT,
      walkins INTEGER,
      calls INTEGER,
      applications INTEGER,
      shortlists INTEGER,
      visas INTEGER
    )
  `);
});

// GET all records
app.get("/data", (req, res) => {
  db.all("SELECT * FROM records", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Failed to fetch data" });
    res.json(rows);
  });
});

// POST new record
app.post("/add", (req, res) => {
  const { counselor, date, walkins, calls, applications, shortlists, visas } = req.body;

  db.run(
    `INSERT INTO records (counselor, date, walkins, calls, applications, shortlists, visas)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [counselor, date, walkins, calls, applications, shortlists, visas],
    function (err) {
      if (err) return res.status(500).json({ error: "Failed to insert data" });

      io.emit("updateData"); // Notify all connected clients
      res.json({ success: true, id: this.lastID });
    }
  );
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
