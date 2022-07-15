const Model = require('./Model');

class Page extends Model {
  constructor() {
    super('personal_pages');
  }

  async findAllWithUser() {
    return this.pool.query(`
        SELECT pp.title, u.pageId ppId, u.id uid, u.userName, u.firstName, u.lastName, u.age, u.gender, u.city, u.interests
        FROM personal_pages pp 
        INNER JOIN users u ON pp.id = u.id;`)
      .then((result) => this.mapReturnedResult(result, true))
      .catch((e) => { throw new Error(`Failed to fetch all ${this.tableName}:\n${e.message}`); });
  }

  async findByIdWithUser(id) {
    return this.pool.query(`
        SELECT pp.title, u.pageId ppId, u.id uid, u.userName, u.firstName, u.lastName, u.age, u.gender, u.city, u.interests
        FROM personal_pages pp 
        INNER JOIN users u ON pp.id = u.id
        WHERE ppId=?;`, [id])
      .then((result) => this.mapReturnedResult(result, true))
      .catch((e) => { throw new Error(`Failed to fetch ${this.tableName} by id:\n${e.message}`); });
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
