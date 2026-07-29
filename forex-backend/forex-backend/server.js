const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();

// Configure CORS: allow specific origins via env or allow all by default
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '*').split(',').map(s => s.trim()).filter(Boolean);
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser requests or same-origin
    if (allowedOrigins.length === 0 || allowedOrigins.indexOf('*') !== -1) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
    return callback(new Error('CORS_NOT_ALLOWED'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // enable preflight for all routes
app.use(express.json());

// Initialize SQLite database file
const dbPath = path.resolve(__dirname, 'forex.db');
const db = new sqlite3.Database(dbPath);

// Create tables and sample data automatically on startup
db.serialize(() => {
  // 1. Create forex_rates table
  db.run(`
    CREATE TABLE IF NOT EXISTS forex_rates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      currency_pair TEXT UNIQUE,
      rate REAL
    )
  `);

  // Insert default forex rates if table is empty
  db.get("SELECT COUNT(*) as count FROM forex_rates", (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare("INSERT INTO forex_rates (currency_pair, rate) VALUES (?, ?)");
      stmt.run("EUR/USD", 1.0850);
      stmt.run("GBP/USD", 1.2640);
      stmt.run("USD/JPY", 155.20);
      stmt.finalize();
    }
  });

  // 2. Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert default users if table is empty
  db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare("INSERT INTO users (username, email) VALUES (?, ?)");
      stmt.run("john_doe", "john@example.com");
      stmt.run("alice_smith", "alice@example.com");
      stmt.finalize();
    }
  });
});

// Root Route
app.get('/', (req, res) => {
  res.send('Forex Backend API is running with SQLite!');
});

// Get Forex Rates
app.get('/api/rates', (req, res) => {
  db.all("SELECT * FROM forex_rates", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get Users
app.get('/api/users', (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => console.log(`Server running on http://${HOST}:${PORT}`));
