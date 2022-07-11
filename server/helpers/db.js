const mysql = require('mysql2');

const {
  DB_HOST: host = 'localhost',
  DB_USER: user,
  DB_PASS: password,
  DB_NAME: database,
  DB_PORT: dbPort = 3306,
} = process.env;

const dbConnectionPool = mysql.createPool({
  host,
  user,
  password,
  database,
  port: dbPort,
  connectionLimit: 10,
}).promise();

module.exports = dbConnectionPool;
