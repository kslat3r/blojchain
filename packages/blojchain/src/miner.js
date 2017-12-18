const TaskQueue = require('./lib/TaskQueue');

module.exports = new TaskQueue({
  name: 'miner',
  worker: (bloj) => {
    console.log(bloj);
  },
});
