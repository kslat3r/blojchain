const http = require('http');
const socketio = require('socket.io');

const Server = function (opts) {
  const server = http.createServer();
  const io = socketio(server);

  server.listen(opts.port);

  io.on('connection', () => {
    console.log(true);
  });
};

module.exports = Server;
