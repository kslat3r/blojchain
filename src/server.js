const http = require('http');
const io = require('socket.io');

const Server = function (opts) {
  const server = http.createServer().listen(opts.port);

  this.socket = io.listen(server);

  this.socket.on('connection', () => {
    console.log(true);
  });
};

module.exports = Server;
