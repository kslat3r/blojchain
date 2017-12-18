const uniqid = require('uniqid');
const logger = require('../logger');

class TaskQueue {
  constructor(opts) {
    this.name = opts.name || uniqid();
    this.worker = opts.worker || (obj => console.log(obj));
    this.items = [];
  }

  add(id, obj) {
    logger.info(`TASKQUEUE ${this.name}`, `Adding ID ${id} to queue`, obj);

    this.items.push({
      id,
      obj,
    });
  }

  remove(id) {
    logger.info(`TASKQUEUE ${this.name}`, `Removing ID ${id} from queue`);

    const index = this.items.findIndex(item => item.id === id);

    this.items.splice(index, 1);
  }

  retrive() {
    return this.tasks;
  }

  reset() {
    logger.info(`TASKQUEUE ${this.name}`, `Resetting queue`);

    this.taks = [];
  }
}

module.exports = TaskQueue;
