const instance = require('./instance');
const onReady = require('./events/on-ready');

instance.createServer();
instance.createNode({
  onReady,
});
