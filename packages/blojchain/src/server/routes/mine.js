const express = require('express');
const router = express.Router();
const logger = require('../../logger');
const miner = require('../../miner');

/**
 * @swagger
 * /mine:
 *   post:
 *     description: Mine a bloj
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: Bloj
 */
router.post('/mine', function(req, res) {
  logger.debug('EVENT mine');

  const bloj = req.body;

  miner.push(bloj);

  logger.info('EVENT blojs:mine', `Added bloj to miner`, bloj);

  res.send({
    ack: true,
  });
});

module.exports = router;
