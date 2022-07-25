const express = require('express');
const getPagesWithUser = require('../controllers/getPagesWithUser');
const { Page } = require('../models');

const { DB_REQUEST_RESULT_LIMIT } = process.env;

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
  const { page: currentPage = 1 } = req.query;
  const totalPagesCount = await Page.count();
  let pages = await getPagesWithUser(currentPage);
  if (pages.length > 0) {
    pages = pages.filter((page) => page.user.uid !== authenticatedUserId);
  }
  const resultsCount = Number(totalPagesCount);
  res.render('pages', {
    title: 'Pages',
    currentPage,
    pages,
    resultsCount,
    pagesCount: Math.ceil(resultsCount / Number(DB_REQUEST_RESULT_LIMIT)),
  });
});

module.exports = router;
