const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.resolve(__dirname, 'forex.db');
const db = new sqlite3.Database(dbPath);

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash) return false;
  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) return false;
  const verifyHash = crypto.scryptSync(password, salt, 64).toString('hex');
  return verifyHash === hash;
}

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS forex_rates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      currency_pair TEXT UNIQUE,
      rate REAL
    )
  `);

  db.get('SELECT COUNT(*) as count FROM forex_rates', (err, row) => {
    if (!err && row && row.count === 0) {
      const stmt = db.prepare('INSERT INTO forex_rates (currency_pair, rate) VALUES (?, ?)');
      stmt.run('EUR/USD', 1.0850);
      stmt.run('GBP/USD', 1.2640);
      stmt.run('USD/JPY', 155.20);
      stmt.finalize();
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      password TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.all('PRAGMA table_info(users)', [], (err, columns) => {
    if (!err && columns && !columns.some((column) => column.name === 'password')) {
      db.run('ALTER TABLE users ADD COLUMN password TEXT');
    }
  });

  db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
    if (!err && row && row.count === 0) {
      const defaultPassword = hashPassword('password123');
      const stmt = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
      stmt.run('john_doe', 'john@example.com', defaultPassword);
      stmt.run('alice_smith', 'alice@example.com', defaultPassword);
      stmt.finalize();
    } else if (!err && row) {
      db.run('UPDATE users SET password = ? WHERE password IS NULL', [hashPassword('password123')]);
    }
  });
});

app.get('/', (req, res) => {
  res.send('Forex Backend API is running with SQLite!');
});

app.get('/api/rates', (req, res) => {
  db.all('SELECT * FROM forex_rates', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Username, email, and password are required.' });
  }

  db.get('SELECT id FROM users WHERE email = ? OR username = ?', [email, username], (err, existingUser) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error while checking user.' });
    }

    if (existingUser) {
      return res.status(409).json({ success: false, message: 'A user with that email or username already exists.' });
    }

    const passwordHash = hashPassword(password);
    db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, passwordHash], function (insertErr) {
      if (insertErr) {
        return res.status(500).json({ success: false, message: 'Registration failed.' });
      }

      return res.status(201).json({
        success: true,
        message: 'Registration successful.',
        user: { id: this.lastID, username, email }
      });
    });
  });
});

app.post('/api/login', (req, res) => {
  const { email, username, password } = req.body;
  const identifier = email || username;

  if (!identifier || !password) {
    return res.status(400).json({ success: false, message: 'Email or username and password are required.' });
  }

  db.get('SELECT id, username, email, password FROM users WHERE email = ? OR username = ?', [identifier, identifier], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error while logging in.' });
    }

    if (!row) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    if (!verifyPassword(password, row.password)) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    return res.json({
      success: true,
      message: 'Login successful.',
      user: { id: row.id, username: row.username, email: row.email }
    });
  });
});

app.post('/api/forgot-password', (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ success: false, message: 'Email and new password are required.' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
  }

  db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error while resetting password.' });
    }

    if (!row) {
      return res.status(404).json({ success: false, message: 'No account found with that email.' });
    }

    const passwordHash = hashPassword(newPassword);
    db.run('UPDATE users SET password = ? WHERE email = ?', [passwordHash, email], function (updateErr) {
      if (updateErr) {
        return res.status(500).json({ success: false, message: 'Password reset failed.' });
      }

      return res.json({ success: true, message: 'Password updated successfully.' });
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on https://trading-g4tl.onrender.com:${PORT}`));