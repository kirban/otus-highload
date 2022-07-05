const express = require('express');
const bcrypt = require('bcryptjs');
const { User, Page } = require('../models');

const router = express.Router();

// router.post('/login', () => {});

router.post('/signup', async (req, res, next) => {
  const {
    username, password, firstName, lastName, age, gender, city, interests,
  } = req.body;

  const user = await User.findByUsername(username);

  if (user.length > 0) {
    const err = new Error('400: User with this name already exists! Try to login');
    res.status(400).json({ message: err.message });
    return next(err);
  }

  const pageTitle = `${username} Page`;
  const pageId = await Page.insert({ title: pageTitle });

  const hash = await bcrypt.hash(password, 10);

  await User.insert({
    hash, username, firstName, lastName, age, gender, city, interests, pageId,
  })
    .then((id) => {
      res.status(200).json({ id, message: 'User created' });
    })
    .catch((e) => {
      const err = new Error(`Server error: ${e.message}`);
      res.status(500).json({ message: err.message }); // todo: remove later, create error handler
      return next(err);
    });
});

module.exports = router;
