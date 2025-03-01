const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors()); // Allow CORS for frontend requests

// ✅ Use a Connection Pool (Instead of Single Connection)
const pool = mysql.createPool({
  host: 'servertc-25c772c3-adriotcplat2024.a.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_ohq66m2-xD5dt9ouwg8',
  database: 'defaultdb',
  port: 20877,
  waitForConnections: true,
  connectionLimit: 10, // ✅ Allows up to 10 active connections
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true,
  },
});

// ✅ Query Route (POST request)
app.post('/query', (req, res) => {
  const { query, values } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Missing SQL query' });
  }

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('❌ Database query error:', error);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
