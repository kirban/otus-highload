const { Page } = require('../models');

const { DB_REQUEST_RESULT_LIMIT } = process.env;

module.exports = function getPagesWithUser(currentPage) {
  const limit = DB_REQUEST_RESULT_LIMIT;
  const offset = currentPage > 1 ? limit * (currentPage - 1) : 0;
  return Page.findAllWithUser(limit, offset);
};
