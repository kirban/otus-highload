const express = require('express');
const getPagesWithUser = require('../controllers/getPagesWithUser');

const { Page } = require('../models');

const router = express.Router();

/**
 * Route for searching user pages
 */
router.get('/pages/search', async (req, res) => {
  const { text } = req.query;
  const pages = await Page.findAllWithPrefix(text, 3);
  res.json(pages);
});

/**
 * Route for getting page for current user
 */
router.get('/me/page', async (req, res) => {
  let { authenticatedUser } = req.cookies;
  if (!authenticatedUser) { return; }
  authenticatedUser = JSON.parse(decodeURI(authenticatedUser));
  const page = await Page.findByIdWithUser(authenticatedUser.id);
  res.json(page);
});

/**
 * Route for getting all existing pages
 */
router.get('/pages', async (req, res) => {
  const { page: currentPage = 1, type } = req.query; // type could be undefined or 'all'
  let personalPages;
  if (type === 'all') {
    personalPages = await Page.findAllWithUser();
  } else {
    personalPages = await getPagesWithUser(currentPage);
  }
  res.json(personalPages);
});

/**
 * Route for getting page by id
 */
router.get('/pages/:pageId', async (req, res) => {
  const { pageId } = req.params;
  const page = await Page.findByIdWithUser(pageId);
  res.json(page);
});

module.exports = router;
