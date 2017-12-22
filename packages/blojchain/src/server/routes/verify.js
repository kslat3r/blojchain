const express = require('express');
const router = express.Router();
const logger = require('../../logger');
const miner = require('../../miner');
const verifyBloj = require('../../helpers/verify-bloj');
const chain = require('../../chain');
const confirmRequests = require('../../requests/confirm');
const node = require('../../node');
const netConfig = require('../../../config/net');

/**
 * @swagger
 * /verify:
 *   post:
 *     description: Verify a bloj
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
router.post('/verify', function(req, res) {
  logger.debug('EVENT verify');

  const bloj = req.body;

  if (verifyBloj(bloj)) {
    bloj.confirmations.push(`${netConfig.nodeHost}:${netConfig.nodePort}`);

    miner.remove(bloj);
    chain.create(bloj);

    confirmRequests.byPeers(node.getPeers(), bloj);

    logger.info('EVENT verify',  'Verified bloj');
    logger.debug(bloj);
  } else {
    logger.error('EVENT verify', 'Could not verify bloj', bloj);
  }

  res.send({
    ack: true,
  });
});

module.exports = router;
