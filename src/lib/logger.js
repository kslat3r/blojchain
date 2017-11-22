const winston = require('winston');

module.exports = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      prettyPrint: true,
      colorize: true,
      timestamp: true,
    }),
  ],
});
