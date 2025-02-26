const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json()); // ✅ Parse JSON requests
app.use(cors()); // ✅ Enable CORS for React Native to access

// ✅ Database connection
const connection = mysql.createConnection({
  host: 'servertc-25c772c3-adriotcplat2024.a.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_ohq66m2-xD5dt9ouwg8',
  database: 'defaultdb',
  port: 20877,
  ssl: {
    ca: fs.readFileSync('./ca.pem') // ✅ Load Aiven's CA certificate
  }
});

connection.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to Aiven MySQL database!');
});

// ✅ Handle Query Requests from React Native
app.post('/query', (req, res) => {
  const { query, values } = req.body;

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('❌ Database query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
