const mysql = require('mysql2');

// Database connection
const db = mysql.createConnection({
  host: 'gdi05.h.filess.io',
  user: 'Dashboard20_movinghour',
  password: '11a77e368a9c0610668737d5cec5d3c6ca1c5649',
  database: 'Dashboard20_movinghour',
  port: '3307',
});

// Connect and count users
db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
  console.log('Connected to the database.');

  const query = 'SELECT COUNT(*) AS userCount FROM users';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching user count:', err);
      process.exit(1);
    }
    console.log(`Total number of users: ${results[0].userCount}`);
    db.end();
  });
});