const TaskQueue = require('./lib/TaskQueue');
const logger = require('./logger');
const chain = require('./chain');
const onConfirmerRemove = require('./events/on-confirmer-remove');
const onBlojUpdate = require('./events/on-bloj-update');
const onConfirmerPush = require('./events/on-confirmer-push');

class Confirmer extends TaskQueue {
  constructor() {
    super({
      name: 'confirmer',
    });

    this.queue = [];
  }

  process(bloj, done) {
    logger.debug('EVENT confirmer');

    const id = bloj.id;
    const found = chain.selectBy({ id });

    if (found) {
      const confirmations = found.confirmations.concat(bloj.confirmations)
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        });

      bloj = chain.updateBy({ id }, { confirmations });

      logger.info('CONFIRMER', 'Confirmed bloj');
      logger.debug(bloj);
    } else {
      logger.error('CONFIRMER', 'Bloj not found to confirm');
    }

    this.remove(bloj);

    done();
  }

  push(bloj) {
    super.push(bloj.id, (done) => {
      this.process(bloj, done);
    });

    this.queue.push(bloj);

    onConfirmerPush(bloj);
  }

  remove(bloj) {
    this.queue.splice(this.queue.findIndex(item => item.id === bloj.id), 1);

    onConfirmerRemove(bloj);
    onBlojUpdate(bloj);
  }

  getQueue() {
    return this.queue;
  }
}

module.exports = new Confirmer().start();
