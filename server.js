require('dotenv').config();

const {
  API_PORT = 8080,
  DB_HOST: host = 'localhost',
  DB_USER: user,
  DB_PASS: password,
  DB_NAME: database,
  DB_PORT: dbPort = 3306,
} = process.env;
const express = require('express');
const mysql = require('mysql');
const authRouter = require('./routes/auth');

const dbConnection = mysql.createConnection({
  host,
  user,
  password,
  database,
  port: dbPort,
});
dbConnection.connect();
const server = express();

server.use(authRouter);

server.listen(API_PORT, () => {
  dbConnection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });

  dbConnection.end();
  console.info(`Server is listening on port ${API_PORT}`);
});
