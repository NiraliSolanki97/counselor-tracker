const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Create / connect database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

// Create table if not exists
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
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
    res.json(rows);
  });
});

// ADD new record
app.post("/add", (req, res) => {
  const { counselor, date, walkins, calls, applications, shortlists, visas } = req.body;

  db.run(
    `INSERT INTO records (counselor, date, walkins, calls, applications, shortlists, visas)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [counselor, date, walkins, calls, applications, shortlists, visas],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to insert data" });
      }
      res.json({ success: true, id: this.lastID });
    }
  );
});

// Start server
app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
