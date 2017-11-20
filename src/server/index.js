const app = require('./app');
const http = require('http');
const logger = require('../lib/logger');

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
      const addr = server.address();
      const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

      logger.info(`SERVER Listening on ${bind}`);
    });
  }
}

module.exports = new Server({
  host: process.env.SERVER_HOST || '127.0.0.1',
  port: process.env.SERVER_PORT || 3000,
});
