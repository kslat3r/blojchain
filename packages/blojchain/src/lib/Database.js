const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const defaultOpts = {
  dir: `${__dirname}/../../data/`,
  name: 'database',
  collection: 'collection',
};

class Database {
  constructor(opts = defaultOpts) {
    this.dir = opts.dir;
    this.name = opts.name;
    this.collection = opts.collection;

    this.connect();
    this.scaffold();
  }

  connect() {
    this.adapter = new FileSync(`${this.dir}/${this.name}.json`);
    this.driver = low(this.adapter);
  }

  scaffold() {
    return this.driver.defaults({
      [this.collection]: [],
    })
    .write();
  }

  selectAll() {
    return this.driver.get(this.collection)
      .value();
  }

  selectBy(args) {
    return this.driver.get(this.collection)
      .find(args)
      .value();
  }

  selectLast() {
    return this.driver.get(this.collection)
      .last()
      .value();
  }

  create(obj) {
    return this.driver.get(this.collection)
      .push(obj)
      .write();
  }

  removeAll() {
    return this.overwrite([]);
  }

  removeBy(args) {
    return this.driver.get(this.collection)
      .remove(args)
      .write();
  }

  reset(objs = []) {
    return this.driver.set(this.collection, objs)
      .write();
  }
}

module.exports = Database;
