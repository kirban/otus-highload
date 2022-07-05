require('dotenv').config();

const { API_PORT = 8080 } = process.env;

const corsOptions = {
  origin: `http://localhost:${API_PORT}`,
};
const express = require('express');
const cors = require('cors');
const dbPool = require('./app/helpers/db');
const session = require('./app/helpers/session');
const authRouter = require('./app/routes/auth');

const server = express();

server.use(express.json());
// server.use(express.urlencoded({ extended: true }));
server.use(cors(corsOptions));
server.use(session);

// routes
server.get('/', (req, res) => {
  res.json({ message: 'Welcome to the application.' });
});

server.use(authRouter);

// add auth middleware here for secured pages

server.listen(API_PORT, () => {
  dbPool.execute('SELECT 1 + 1 AS solution')
    .then((result) => {
      console.log('The solution is: ', result[0][0].solution);
    })
    .catch((e) => {
      console.log('Failed to execute solution. Pool is closing ...', e.message);
      dbPool.end();
    });

  console.info(`Server is listening on port ${API_PORT}`);
});
