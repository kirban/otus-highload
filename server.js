require('dotenv').config();

const {
  API_PORT = 8080,
  DB_HOST: host = 'localhost',
  DB_USER: user,
  DB_PASS: password,
  DB_NAME: database,
  DB_PORT: dbPort = 3306,
} = process.env;

const corsOptions = {
  origin: `http://localhost:${API_PORT}`,
};
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const authRouter = require('./app/middleware/auth');

const dbConnectionPool = mysql.createPool({
  host,
  user,
  password,
  database,
  port: dbPort,
  connectionLimit: 10,
}).promise();

const server = express();

server.use(express.json());
// server.use(express.urlencoded({ extended: true }));
server.use(cors(corsOptions));
server.use(authRouter);

// routes
server.get('/', (req, res) => {
  res.json({ message: 'Welcome to the application.' });
});

server.listen(API_PORT, () => {
  dbConnectionPool.execute('SELECT 1 + 1 AS solution')
    .then((result) => {
      console.log('The solution is: ', result[0][0].solution);
    })
    .catch((e) => {
      console.log('Failed to execute solution. Pool is closing ...', e.message);
      dbConnectionPool.end();
    });

  console.info(`Server is listening on port ${API_PORT}`);
});
