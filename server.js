const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

// ✅ MySQL connection pool
const pool = mysql.createPool({
  host: 'servertc-25c772c3-adriotcplat2024.a.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_ohq66m2-xD5dt9ouwg8',
  database: 'Tcplat',
  port: 20877,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: fs.readFileSync('./ca.pem'),
  },
});

// ✅ General query handler (already used in frontend)
app.post('/query', (req, res) => {
  const { query, values } = req.body;

  if (!query) return res.status(400).json({ error: 'Missing SQL query' });

  pool.query(query, values, (err, results) => {
    if (err) {
      console.error('❌ SQL error:', err);
      return res.status(500).json({ error: 'Query failed' });
    }

    res.json({
      results,
      insertId: results.insertId || null,
    });
  });
});
