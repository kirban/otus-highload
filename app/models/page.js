const Model = require('./Model');

class Page extends Model {
  constructor() {
    super('personal_pages');
  }
}

const page = new Page();
module.exports = page;
