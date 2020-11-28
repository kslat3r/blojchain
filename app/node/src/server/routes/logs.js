const express = require('express');
const router = express.Router();
const logger = require('../../logger');

/**
 * @swagger
 * /logs:
 *   get:
 *     description: Get all logs
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Logs
 */
router.get('/logs', function(req, res) {
  logger.debug('EVENT logs:get');

  res.send(logger.getLogs());
});

module.exports = router;
