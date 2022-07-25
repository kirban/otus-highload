const Model = require('./Model');

class Page extends Model {
  constructor() {
    super('personal_pages');
  }

  async findAllWithUser(limit, offset = 0) {
    return this.pool.query(`
        SELECT pp.title, u.pageId ppId, u.id uid, u.userName, u.firstName, u.lastName, u.age, u.gender, u.city, u.interests
        FROM personal_pages pp 
        INNER JOIN users u ON pp.id = u.id
        ${limit ? `LIMIT ${offset}, ${limit}` : ''};`)
      .then((result) => this.mapReturnedResult(result, true))
      .catch((e) => { throw new Error(`Failed to fetch all ${this.tableName}:\n${e.message}`); });
  }

  async findByIdWithUser(id) {
    return this.pool.query(`
        SELECT pp.title, u.pageId ppId, u.id uid, u.userName, u.firstName, u.lastName, u.age, u.gender, u.city, u.interests
        FROM personal_pages pp 
        INNER JOIN users u ON pp.id = u.id
        WHERE pp.id=?;`, [id])
      .then((result) => this.mapReturnedResult(result, true))
      .catch((e) => { throw new Error(`Failed to fetch ${this.tableName} by id:\n${e.message}`); });
  }

  async findAllWithPrefix(prefix, limit, offset = 0) {
    return this.pool.query(`
      SELECT pp.title, u.pageId ppId, u.id uid, u.userName, u.firstName, u.lastName, u.age, u.gender, u.city, u.interests
        FROM personal_pages pp 
        INNER JOIN users u ON pp.id = u.id
        WHERE u.firstName LIKE ? OR u.lastName LIKE ?
        ${limit ? `LIMIT ${offset}, ${limit}` : ''};`, [`${prefix}%`, `${prefix}%`])
      .then((result) => this.mapReturnedResult(result, true))
      .catch((e) => { throw new Error(`Failed to find with prefix ${e}`); });
  }

  mapReturnedResult([rows, _columns], withUser = false) {
    if (withUser) {
      const formattedRows = rows.map((row) => {
        const {
          ppId, title, ...user
        } = row;

        return { id: ppId, title, user };
      });

      return formattedRows.insertId ? formattedRows.insertId : formattedRows;
    }
    return rows.insertId ? rows.insertId : rows;
  }
}

const page = new Page();
module.exports = page;
