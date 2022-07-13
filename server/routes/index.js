const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/me');
});

router.get('/me', (req, res) => {
  if (!req.cookies.authenticatedUser) {
    res.redirect('/login');
  } else {
    res.render('me', { title: 'Dashboard', user: JSON.parse(decodeURI(req.cookies.authenticatedUser)) });
  }
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Sign In' });
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Sign Up' });
});

module.exports = router;
