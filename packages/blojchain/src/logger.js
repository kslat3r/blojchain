const winston = require('winston');

module.exports = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL || 'info',
      prettyPrint: true,
      colorize: true,
      timestamp: true,
    }),
  ],
});
