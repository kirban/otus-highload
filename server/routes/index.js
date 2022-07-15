const express = require('express');
const { Page } = require('../models');

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

router.get('/pages', async (req, res) => {
  const { authenticatedUser } = req.cookies;
  if (!authenticatedUser) { return; }
  const authenticatedUserId = JSON.parse(decodeURI(authenticatedUser)).id;
  let pages = await Page.findAllWithUser();
  if (pages.length > 0) {
    pages = pages.filter((page) => page.user.uid !== authenticatedUserId);
  }
  res.render('pages', { title: 'Pages', pages });
});

module.exports = router;
