const expressWinston = require('express-winston');
const winston = require('winston');

module.exports = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      prettyPrint: true,
      colorize: true,
      timestamp: true,
    }),
  ],
  meta: false,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}}",
});
