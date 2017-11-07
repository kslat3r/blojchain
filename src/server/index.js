const app = require('./app');
const http = require('http');
const logger = require('../lib/logger');

const Server = function (opts) {
  this.opts = opts;

  this.start();
};

Server.prototype.start = function () {
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

module.exports = Server;
