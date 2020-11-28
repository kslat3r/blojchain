const node = require('../node');

module.exports = () => {
  setInterval(() => {
    node.disconnect();
    node.reconnect();
  }, 60*60*1000);
}
