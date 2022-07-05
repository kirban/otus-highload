const Model = require('./Model');

class User extends Model {
  constructor() {
    super('users');
  }

  // todo: implement method find by id overload to return value without hash

  async findByUsername(fieldValue) {
    // todo: remove hash from response
    return this.pool.query('SELECT * FROM users WHERE userName=?', [fieldValue])
      .then((result) => this.mapReturnedResult(result))
      .catch((e) => { throw new Error(`Failed to fetch user with username ${fieldValue}:\n${e.message}`); });
  }
}
const user = new User();
module.exports = user;
