const app = require('../server/app');
const http = require('http');
const socketIo = require('socket.io');
const logger = require('../logger');

class Server {
  constructor(opts) {
    this.opts = opts;

    this.start();
  }

  start() {
    const port = this.opts.port || 3000;
    app.set('port', port);

    const server = http.createServer(app);
    server.listen(port);

    const io = socketIo(server);
    app.set('io', io);

    server.on('error', (error) => {
      if (error.syscall !== 'listen') {
        throw error;
      }

      const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

      switch (error.code) {
        case 'EACCES':
          logger.error(`SERVER ${bind} requires elevated privileges`);

          process.exit(1);
          break;

        case 'EADDRINUSE':
          logger.error(`SERVER ${bind} is already in use`);

          process.exit(1);
          break;

        default:
          throw error;
      }
    });

    server.on('listening', () => {
      logger.info(`SERVER listening on ${this.opts.host}:${this.opts.port}`);
    });
  }
}

module.exports = Server;
