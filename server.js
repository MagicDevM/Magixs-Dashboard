const express = require('express');
const checkAlt = require('./exec/antiAlt');
const config = require('./exec/config')
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('bodyy-parser');
const fs = require('fs');
const app = express();

const configPath = path.join(__dirname, 'config.json');
console.log("\x1b[1m\x1b[33mStarting\x1b[0m\x1b[90m | \x1b[0mStarting Server...");
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
console.log("\x1b[1m\x1b[33mWorking\x1b[0m\x1b[90m | \x1b[0mConnecting to mysql...");
const db = mysql.createConnection({
  host: 'gdi05.h.filess.io',
  user: 'Dashboard20_movinghour',
  password: '11a77e368a9c0610668737d5cec5d3c6ca1c5649',
  database: 'Dashboard20_movinghour',
  port: '3307',
});

db.connect((err) => {
  if (err) {
    console.error(`\x1b[1m\x1b[31mError\x1b[0m\x1b[90m | \x1b[0mUnable to connect to mysql`, err);
    return;
  };
  console.log('\x1b[1m\x1b[32mSuccess\x1b[0m\x1b[90m | \x1b[0mSuccessfully connected to mysql.');
});

function checkIfTableExists(tableName, callback) {
  const query = `
  SELECT TABLE_NAME
  FROM information_schema.TABLES
  WHERE TABLE_SCHEMA = ?
  AND TABLE_NAME = ?`;

  db.query(query,
    [db.config.database,
      tableName],
    (err, results) => {
      if (err) {
        console.error('Error checking if table exists:', err);
        return callback(err, false);
      }

      if (results.length > 0) {
        console.log(`Table '${tableName}' exists.`);
        return callback(null, true);
      } else {
        console.log(`Table '${tableName}' does not exist.`);
        return callback(null, false);
      }
    });
}

// Usage example
checkIfTableExists('users', (err, exists) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  if (exists) {
    console.log('The table "users" exists.');
  } else {
    console.log('The table "users" does not exist.');
  }
});

const createTableQuery = `CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) NOT NULL UNIQUE,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`

db.query(createTableQuery, (err, results) => {
  if (err) {
    console.error(`\x1b[1m\x1b[31mError\x1b[0m\x1b[90m | \x1b[0mError creating table`, err);
  } else if (results.warningCount === 0) {
    console.log('\x1b[1m\x1b[32mSuccess\x1b[0m\x1b[90m | \x1b[0mUsers table created in the database.');
  }
  const PORT = 2000;
  app.listen(PORT, () => {
    console.log(`\x1b[1m\x1b[32mSuccess\x1b[0m\x1b[90m | \x1b[0mServer online on http://localhost:${PORT}.`);
  })
});
app.post('/register', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAccess;

  if (checkAlt(ip)) {
    return res.status(429).send('Only 1 account can be created from this ip')
  }
  const {
    username,
    email,
    password
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, results) => {
      if (err) {
        console.error('Error checking user:', err);
        return res.status(500).send('Server error. Please try again later.');
      }

      if (results.length > 0) {
        // Check if the email or username already exists
        const existingUser = results[0];

        if (existingUser.email === email) {
          return res.status(400).send('Email is already in use.');
        }

        if (existingUser.username === username) {
          return res.status(400).send('Username is already taken.');
        }
        res.send("continue")
      }
    })
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query,
      [username,
        email,
        hashedPassword],
      (err, results) => {
        if (err) {
          console.error(`\x1b[1m\x1b[31mError\x1b[0m\x1b[90m | \x1b[0mAn error occured while registering user`, err);
          return res.status(500).send("error registering user");
        };
      });
    res.send('Successfully registed!');
  } catch (err) {
    console.error('\x1b[1m\x1b[31mError\x1b[0m\x1b[90m | \x1b[0mAn error occured while hashing password.',
      err);
    return res.status(500).send("An error occured");
  };
});

app.delete('/delete-account', (req, res) => {
  const {
    email
  } = req.body;
  if (!email) {
    return res.status(400).send('Email required');
  };
  const deleteacc = 'DELETE FROM users WHERE email = ?';
  db.query(deleteacc, [email], (err, results) => {
    if (err) {
      console.error(`\x1b[1m\x1b[31mError\x1b[0m\x1b[90m | \x1b[0mError while deleting user`, err);
      return res.status(500).send('Error deleting user');
    };
    if (results.affectedRows === 0) {
      return res.status(404).send('Account not found');
    };
    console.log("\x1b[1m\x1b[32mSuccess\x1b[0m\x1b[90m | \x1b[0msuccessfully deleted account.")
    res.status(200).send("Account deleted successfully.");
  });
});
console.log("\x1b[1m\x1b[32mSuccess\x1b[0m\x1b[90m | \x1b[0mSuccessfully registered routes.")
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'exec')));
app.use(express.static(path.join(__dirname, 'misc')));

app.get("/", (req, res) => {
  res.redirect('/dashboard')
});

app.get("/dashboard", (req, res) => {
  res.render('home');
});

const userRouter = require("./routers/users.js")
app.use("/user", userRouter)

app.use((req, res) => {
  res.status(404).render('404');
});