const instance = require('./instance');
const onReady = require('./events/on-ready');
const onInterval = require('./events/on-interval');

instance.createServer();
instance.createNode({
  onReady,
});

onInterval();
