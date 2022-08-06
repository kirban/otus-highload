const express = require('express');
const bcrypt = require('bcryptjs');
const { User, Page } = require('../models');
const sanitizer = require('../helpers/sanitizer');

const router = express.Router();

router.post('/signin', async (req, res, next) => {
  if (!req.body.authorization) {
    console.dir(req.body);
    return res.status(401).json({ message: 'Missing Authorization' });
  }
  const base64Credentials = req.body.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  const user = await User.findByUsername(username);
  if (user.length === 0) {
    return res.status(401).json({ message: 'Wrong credentials' });
  }
  const compareResult = await bcrypt.compare(password, user[0].hash);

  if (!compareResult) {
    return res.status(401).json({ message: 'Wrong credentials' });
  }

  const userWithoutSensitiveData = JSON.stringify(sanitizer(user[0]));
  res.cookie('authenticatedUser', userWithoutSensitiveData, { maxAge: 86400000 });
  return res.redirect('/me');
});

router.post('/signup', async (req, res, next) => {
  const {
    username, password, firstName, lastName, age, gender, city, interests,
  } = req.body;

  const user = await User.findByUsername(username);

  if (user.length > 0) {
    const err = new Error('400: User with this name already exists! Try to login');
    return res.status(400).json({ message: err.message });
  }

  const pageTitle = `${username} Page`;
  const pageId = await Page.insert({ title: pageTitle });

  let hash;
  try {
    hash = await bcrypt.hash(password, 10);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  try {
    const newUserId = await User.insert({
      hash, username, firstName, lastName, age, gender, city, interests, pageId,
    });
    return res.status(200).json({ newUserId, message: 'User created' });
  } catch (e) {
    const err = new Error(`Server error: ${e.message}`);
    console.log(`Server error: ${e.message}`);
    res.status(500).json({ message: err.message }); // todo: remove later, create error handler
    return next(err);
  }
});

module.exports = router;
