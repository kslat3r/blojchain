const instance = require('./lib/instance');
const onReady = require('./lib/events/on-ready');

instance.createServer();
instance.createNode({
  onReady,
});
