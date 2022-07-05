const dbConnectionPool = require('../helpers/db');

const User = {
  async findAll() {
    return dbConnectionPool.query('SELECT * FROM users')
      .then((result) => result[0])
      .catch((e) => { throw new Error(`Failed to fetch all users:\n${e.message}`); });
  },
  async findByUsername(fieldValue) {
    return dbConnectionPool.query('SELECT * FROM users WHERE userName=?', [fieldValue])
      .then((result) => result[0])
      .catch((e) => { throw new Error(`Failed to fetch user with username ${fieldValue}:\n${e.message}`); });
  },
  async insert(hash, userName, firstName, lastName, age, gender, city, interests, pageId) {
    return dbConnectionPool.query('INSERT INTO users(hash, userName, firstName, lastName, age, gender, city, interests, pageId) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', [hash, userName, firstName, lastName, age, gender, city, interests, pageId])
      .then((result) => result[0])
      .catch((e) => { throw new Error(`Failed to insert user:\n${e.message}`); });
  },
  async update(id, hash, userName, firstName, lastName, age, gender, city, interests, pageId) {
    return dbConnectionPool.query('UPDATE users SET hash=?, firstName=?, userName=? lastName=?, age=?, gender=?, city=?, interests=?, pageId=? WHERE id=', [hash, userName, firstName, lastName, age, gender, city, interests, pageId, id])
      .then((result) => result[0])
      .catch((e) => { throw new Error(`Failed to update user with id ${id}:\n${e.message}`); });
  },
  async delete(id) {
    return dbConnectionPool.query('DELETE FROM users WHERE id=?', [id])
      .then((result) => result[0])
      .catch((e) => { throw new Error(`Failed to remove user with id ${id}:\n${e.message}`); });
  },
};

module.exports = User;
