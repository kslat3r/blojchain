const uniqid = require('uniqid');
const logger = require('../logger');
const netConfig = require('../../config/net');

class TaskQueue {
  constructor(opts) {
    this.name = opts.name || uniqid();
    this.items = [];
    this.processing = false;
  }

  unshift(id = uniqid(), fn) {
    logger.debug(`TASKQUEUE ${this.name}`, `Unshifting task ${id} to queue`);

    this.items.unshift({
      id,
      fn,
    });

    return this;
  }

  push(id = uniqid(), fn) {
    setTimeout(() => {
      logger.debug(`TASKQUEUE ${this.name}`, `Pushing task ${id} to queue with ${netConfig.delay} delay`);

      this.items.push({
        id,
        fn,
      });
    }, netConfig.delay);

    return this;
  }

  remove(id) {
    logger.debug(`TASKQUEUE ${this.name}`, `Removing task ${id} from queue`);

    this.items.splice(this.items.findIndex(item => item.id === id), 1);

    return this;
  }

  reset() {
    logger.debug(`TASKQUEUE ${this.name}`, `Resetting queue`);

    this.items = [];

    return this;
  }

  start() {
    setInterval(() => {
      if (!this.processing) {
        const item = this.items.shift();

        if (item) {
          this.processing = true;

          logger.debug(`TASKQUEUE ${this.name}`, `Processing task ${item.id}`);

          item.fn(() => {
            logger.debug(`TASKQUEUE ${this.name}`, `Processed task ${item.id}`);

            this.processing = false;
          });
        }
      }
    }, 10);

    return this;
  }
}

module.exports = TaskQueue;
