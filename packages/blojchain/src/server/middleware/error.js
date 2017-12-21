const logger = require('../../logger');

module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  logger.error(err.message);

  res.status(err.status || 500);
  res.send({
    error: {
      message: err.message,
    },
  });
};
