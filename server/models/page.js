const Model = require('./Model');

class Page extends Model {
  constructor() {
    super('personal_pages');
  }

  async findAll() {
    return this.pool.query(`SELECT * FROM ${this.tableName} INNER JOIN users ON users.pageId=personal_pages.id`)
      .then((result) => this.mapReturnedResult(result))
      .catch((e) => { throw new Error(`Failed to fetch all ${this.tableName}:\n${e.message}`); });
  }

  async findById(id) {
    return this.pool.query(`SELECT * FROM ${this.tableName} INNER JOIN users ON users.pageId=personal_pages.id WHERE personal_pages.id=?`, [id])
      .then((result) => this.mapReturnedResult(result))
      .catch((e) => { throw new Error(`Failed to fetch ${this.tableName} by id:\n${e.message}`); });
  }

  mapReturnedResult([rows, _columns]) {
    const formattedRows = rows.map((row) => {
      const {
        id, title, hash, pageId, ...user
      } = row;
      return { id, title, user };
    });

    return formattedRows.insertId ? formattedRows.insertId : formattedRows;
  }
}

const page = new Page();
module.exports = page;
