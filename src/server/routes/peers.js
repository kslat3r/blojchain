const express = require('express');
const router = express.Router();
const logger = require('../../lib/logger');
const peer = require('../../lib/peer');

/**
 * @swagger
 * /peers:
 *   get:
 *     description: Get all peers of this node
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Peers
 */
router.get('/', function(req, res) {
  logger.info('EVENT peers:getAll');

  res.send(peer.getPeers());
});

module.exports = router;
