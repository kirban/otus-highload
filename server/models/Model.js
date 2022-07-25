const dbConnectionPool = require('../helpers/db');

class Model {
  pool;

  tableName;

  constructor(tableName) {
    this.pool = dbConnectionPool;
    this.tableName = tableName;
  }

  async findAll(limit, offset = 0) {
    return this.pool.query(`SELECT * FROM ${this.tableName} ${limit ? `LIMIT ${offset}, ${limit}` : ''}`)
      .then((result) => this.mapReturnedResult(result))
      .catch((e) => { throw new Error(`Failed to fetch all ${this.tableName}:\n${e.message}`); });
  }

  async findById(id) {
    return this.pool.query(`SELECT * FROM ${this.tableName} WHERE id=?`, [id])
      .then((result) => this.mapReturnedResult(result))
      .catch((e) => { throw new Error(`Failed to fetch ${this.tableName} by id:\n${e.message}`); });
  }

  async insert({ ...data }) {
    const dataKeys = Object.keys(data).join(',');
    const questionMarksString = Array.from('?'.repeat(Object.keys(data).length)).join(', ');

    return this.pool.query(`INSERT INTO ${this.tableName}(${dataKeys}) VALUES(${questionMarksString})`, [...Object.values(data)])
      .then((result) => this.mapReturnedResult(result))
      .catch((e) => { throw new Error(`Failed to insert in ${this.tableName}:\n${e.message}`); });
  }

  async update(id, { ...data }) {
    const updateString = Object.keys(data).map((key) => `${key}=?`).join(' ');

    return this.pool.query(`UPDATE ${this.tableName} SET ${updateString} WHERE id=${id}`, [...Object.values(data)])
      .then((result) => this.mapReturnedResult(result))
      .catch((e) => { throw new Error(`Failed to update ${this.tableName} with id ${id}:\n${e.message}`); });
  }

  async delete(id) {
    return this.pool.query(`DELETE FROM ${this.tableName} WHERE id=?`, [id])
      .then((result) => this.mapReturnedResult(result))
      .catch((e) => { throw new Error(`Failed to remove ${this.tableName} with id ${id}:\n${e.message}`); });
  }

  async count(where) {
    return this.pool.query(`SELECT COUNT(*) FROM ${this.tableName} ${where ? `WHERE ${where}` : ''}`)
      .then((result) => this.mapReturnedResult(result))
      .then(([count]) => count['COUNT(*)'])
      .catch((e) => { throw new Error(`Failed to fetch count ${this.tableName}:\n${e.message}`); });
  }

  mapReturnedResult([rows, _columns]) {
    return rows.insertId ? rows.insertId : rows;
  }
}

module.exports = Model;
