const express = require('express');
const getPagesWithUser = require('../controllers/getPagesWithUser');

const { Page } = require('../models');

const router = express.Router();

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
  // const { limit, offset } = req.params;
  const { page: currentPage = 1 } = req.params;
  const personalPages = await getPagesWithUser(currentPage);
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
