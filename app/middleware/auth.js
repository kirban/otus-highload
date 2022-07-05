const bcrypt = require('bcryptjs');
const { User } = require('../models');

const authorizer = async (username, password, cb) => {
  const user = await User.findByUsername(username);
  if (user.length === 0) {
    return cb(null, false);
  }
  const compareResult = await bcrypt.compare(password, user[0].hash);

  return cb(null, compareResult);
};

module.exports = authorizer;
