const instance = require('../instance');

module.exports = () => {
  setInterval(() => {
    instance.getNode().disconnect();
    instance.getNode().reconnect();
  }, 60*60*1000);
}
