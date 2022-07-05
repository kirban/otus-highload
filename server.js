require('dotenv').config();
const express = require('express');
const cors = require('cors');
const basicAuth = require('express-basic-auth');

const authorizer = require('./app/middleware/auth');
const session = require('./app/helpers/session');
const authRouter = require('./app/routes/auth');

const { API_PORT = 8080 } = process.env;
const corsOptions = {
  origin: `http://localhost:${API_PORT}`,
};

const server = express();

server.use(express.json());
// server.use(express.urlencoded({ extended: true }));
server.use(cors(corsOptions));
server.use(session);

// routes

server.use(authRouter);

server.use(basicAuth({
  authorizer,
  authorizeAsync: true,
  challenge: true,
  realm: 'Imb4T3st4pp',
}));

server.get('/me', (req, res) => {
  res.json({ message: 'Welcome to the application. Soon here will be a markup' });
});

server.listen(API_PORT, () => {
  console.info(`Server is listening on port ${API_PORT}`);
});
