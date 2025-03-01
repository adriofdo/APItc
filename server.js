const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors()); // ✅ Allow CORS for frontend requests

// ✅ Use a Connection Pool to avoid connection issues
const pool = mysql.createPool({
  host: 'servertc-25c772c3-adriotcplat2024.a.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_ohq66m2-xD5dt9ouwg8',
  database: 'Tcplat',
  port: 20877,
  waitForConnections: true,
  connectionLimit: 10, // ✅ Allows multiple simultaneous queries
  queueLimit: 0,
  ssl: {
    ca: fs.readFileSync('./ca.pem'), // ✅ Load Aiven's CA certificate
  },
});

// ✅ Query Endpoint - Handles database queries securely
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

// ✅ Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
