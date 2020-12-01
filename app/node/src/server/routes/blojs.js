const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');
const logger = require('../../logger');
const chain = require('../../chain');
const hash = require('../../helpers/hash');
const node = require('../../node');
const mineRequests = require('../../requests/mine');

/**
 * @swagger
 * /blojs:
 *   get:
 *     description: Get all blojs of this node
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Blojs
 */
router.get('/blojs', function(req, res) {
  logger.debug('EVENT blojs:get');

  res.send(chain.selectAll());
});

/**
 * @swagger
 * /blojs/hash:
 *   get:
 *     description: Get the hash of all blojs
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Hash
 */
router.get('/blojs/hash', function(req, res) {
  logger.debug('EVENT blojs:get:hash');

  const hashed = hash(JSON.stringify(chain.selectAll()));

  res.send(hashed);
});

/**
 * @swagger
 * /blojs:
 *   post:
 *     description: Add a bloj
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
router.post('/blojs', async function(req, res) {
  logger.debug('EVENT blojs:create');

  const bloj = {
    id: hash(uniqid()),
    data: req.body,
  };

  const responses = await mineRequests.byPeers(node.getPeers({ includeSelf: true }), bloj);

  logger.info('EVENT blojs:create', 'Bloj was sent to peers for mining');
  logger.debug(responses);

  res.send(responses);
});

module.exports = router;
