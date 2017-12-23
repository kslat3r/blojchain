const express = require('express');
const router = express.Router();
const logger = require('../../logger');
const miner = require('../../miner');

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
router.get('/candidates', function(req, res) {
  logger.debug('EVENT candidates:get');

  res.send(miner.getCandidates());
});

module.exports = router;
