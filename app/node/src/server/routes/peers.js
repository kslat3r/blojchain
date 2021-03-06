const express = require('express');
const router = express.Router();
const logger = require('../../logger');
const node = require('../../node');

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
router.get('/peers', function(req, res) {
  logger.debug('EVENT peers:get');

  res.send(node.getPeers({ includeSelf: true }));
});

module.exports = router;
