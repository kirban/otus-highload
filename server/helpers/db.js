const mysql = require('mysql2');
const fs = require('fs');

let config;

if (process.env.NODE_ENV !== 'production') {
  config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    connectionLimit: 10,
  };
} else {
  config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync('.mysql/root.crt').toString(),
    },
  };
}

const dbConnectionPool = mysql.createPool({ ...config }).promise();

module.exports = dbConnectionPool;
