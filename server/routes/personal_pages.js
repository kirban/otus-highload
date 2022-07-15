const express = require('express');

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
  const pages = await Page.findAllWithUser();
  res.json(pages);
});

/**
 * Route for getting page by id
 */
router.get('/pages/{pageId}', async (req, res) => {
  const { pageId } = req.params;
  const page = await Page.findByIdWithUser(pageId);
  res.json(page);
});

module.exports = router;
