const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const db = require('./db');

const {
  DB_HOST: host = 'localhost',
  DB_USER: user,
  DB_PASS: password,
  DB_NAME: database,
  DB_PORT: port = 3306,
} = process.env;

const options = {
  host,
  port,
  user,
  password,
  database: 'sessions',
};

const sessionStore = new MySQLStore(options, db);

const appSession = session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
});

module.exports = appSession;
