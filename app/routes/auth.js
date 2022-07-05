const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

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

  // const page = Page.insert(); // todo: create a page
  const pageId = 0; // todo: temp, remove later

  const hash = await bcrypt.hash(password, 10);

  const newUser = await User.insert({
    hash, username, firstName, lastName, age, gender, city, interests, pageId,
  })
    .then((data) => {
      res.status(200).json({ message: 'OK' });
    })
    .catch((e) => {
      const err = new Error(`Server error: ${e.message}`);
      res.status(500).json({ message: err.message });
      return next(err);
    });
});

module.exports = router;
