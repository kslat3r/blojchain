const logger = require('../../lib/logger');

module.exports = (err, req, res, next) => {
  logger.error(err.message);

  res.status(err.status || 500);
  res.send({
    message: err.message,
  });
};
