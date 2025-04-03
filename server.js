const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs');
const app = express();

// ✅ Always use process.env.PORT for Railway (DO NOT hardcode!)
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// ✅ MySQL Pool (adjust credentials as needed)
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
    ca: fs.readFileSync('./ca.pem'), // ✅ Make sure this exists in root folder
  },
});

// ✅ POST /query — generic query endpoint (for SELECT, INSERT, etc.)
app.post('/query', (req, res) => {
  const { query, values } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Missing SQL query' });
  }

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

// ✅ Start the server on Railway's assigned port
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
