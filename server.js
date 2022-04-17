require('dotenv').config();

const {
  PORT = 8000,
  DB_HOST: host,
  DB_USER: user,
  DB_PASS: password,
  DB_NAME: database,
} = process.env;
const express = require('express');
const mysql = require('mysql');
const authRouter = require('./routes/auth');

const dbConnection = mysql.createConnection({
  host,
  user,
  password,
  database,
});
dbConnection.connect();
const server = express();

server.use(authRouter);

server.listen(PORT, () => {
  dbConnection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });

  dbConnection.end();
  console.info(`Server is listening on port ${PORT}`);
});
