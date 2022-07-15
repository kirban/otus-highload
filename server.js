require('dotenv').config();
const express = require('express');
const cors = require('cors');
const basicAuth = require('express-basic-auth');
const cookieParser = require('cookie-parser');

const authorizer = require('./server/middleware/auth');
const session = require('./server/helpers/session');
const authRouter = require('./server/routes/auth');
const mainRouter = require('./server/routes/index');
const pagesRouter = require('./server/routes/personal_pages');

const { API_PORT = 8080 } = process.env;
const corsOptions = {
  origin: `http://localhost:${API_PORT}`,
};

const server = express();

server.set('view engine', 'pug');
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors(corsOptions));
server.use(session);

// routes

server.use(express.static('public'));
server.use(mainRouter);
server.use('/api/', authRouter);

server.use(basicAuth({
  authorizer,
  authorizeAsync: true,
  challenge: true,
  realm: 'Imb4T3st4pp',
}));

server.use('/api/', pagesRouter);

server.listen(API_PORT, () => {
  console.info(`Server is listening on port ${API_PORT}`);
});
