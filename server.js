require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'servertc-25c772c3-adriotcplat2024.a.aivencloud.com',
  user: process.env.DB_USER || 'avnadmin',
  password: process.env.DB_PASSWORD || 'your_password_here',
  database: process.env.DB_NAME || 'defaultdb',
  port: process.env.DB_PORT || 20877,
  ssl: { rejectUnauthorized: true } // Required for Aiven
});

// Test connection
connection.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to Aiven MySQL database!');
});

module.exports = connection;
