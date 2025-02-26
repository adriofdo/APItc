const fs = require('fs');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'servertc-25c772c3-adriotcplat2024.a.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_ohq66m2-xD5dt9ouwg8',
  database: 'defaultdb',
  port: 20877,
  ssl: {
    ca: fs.readFileSync('./ca.pem') // Load Aiven's CA certificate
  }
});

connection.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to Aiven MySQL database!');
});

module.exports = connection;
