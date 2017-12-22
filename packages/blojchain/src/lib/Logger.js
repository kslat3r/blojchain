const winston = require('winston');
const onLog = require('../events/on-log');

class Logger {
  constructor() {
    this.lib = new winston.Logger({
      transports: [
        new winston.transports.Console({
          level: process.env.LOG_LEVEL || 'info',
          prettyPrint: true,
          colorize: true,
          timestamp: true,
        }),
      ],
    });

    this.logs = [];
  }

  debug(...args) {
    const obj = {
      type: 'debug',
      args,
    };

    onLog(obj);
    this.logs.push(obj);

    this.lib.debug.apply(this, args);
  }

  info(...args) {
    const obj = {
      type: 'info',
      args,
    };

    onLog(obj);
    this.logs.push(obj);

    this.lib.info.apply(this, args);
  }

  error(...args) {
    const obj = {
      type: 'error',
      args,
    };

    onLog(obj);
    this.logs.push(obj);

    this.lib.error.apply(this, args);
  }

  getLogs() {
    return this.logs;
  }
}

module.exports = Logger;
