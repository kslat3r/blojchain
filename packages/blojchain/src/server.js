const Server = require('./server/index');

const serverHost = process.env.SERVER_HOST || '127.0.0.1';
const serverPort = process.env.SERVER_PORT || 3000;

module.exports = new Server({
  host: serverHost,
  port: serverPort,
});
