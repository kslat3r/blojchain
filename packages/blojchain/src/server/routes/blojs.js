const express = require('express');
const router = express.Router();
const logger = require('../../logger');
const chain = require('../../chain');
const node = require('../../node');
const blojsRequests = require('../../requests/blojs');
const miner = require('../../miner');
const blojVerifier = require('../../verifiers/bloj');

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
router.get('/', function(req, res) {
  logger.info('EVENT blojs:get');

  res.send(chain.get());

  // const io = req.app.get('io');
  // io.emit('hello')
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
router.get('/hash', function(req, res) {
  logger.info('EVENT blojs:get:hash');

  res.send(chain.getHash());
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
router.post('/', async function(req, res) {
  logger.info('EVENT blojs:create');

  const bloj = Object.assign({}, req.body, {
    timestamp: new Date().getTime(),
  });

  const responses = await blojsRequests.mineByPeers(node.getPeers(), bloj);

  logger.info('EVENT blojs:create', 'Bloj was sent to peers for mining');

  res.send(responses);
});

/**
 * @swagger
 * /blojs/mine:
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
  logger.info('EVENT blojs:mine');

  const bloj = req.body;

  miner.add(bloj.index, bloj);

  logger.info('EVENT blojs:mine', `Added bloj to miner`, bloj);

  res.send({
    ack: true,
    serverPort: process.env.SERVER_PORT,
    serverHost: process.env.SERVER_HOST,
  });
});

/**
 * @swagger
 * /blojs/verify:
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
  logger.info('EVENT blojs:verify');

  const bloj = req.body;
  const prevBloj = chain.getIndex(bloj.index - 1);

  // sanity check

  if (!prevBloj) {
    throw new Error('Could not find previous bloj for bloj received');
  }

  if (prevBloj.hash !== bloj.prevHash) {
    throw new Error('Bloj received does not match last bloj hash');
  }

  if (!blojVerifier(bloj)) {
    throw new Error('Bloj could not be verified');
  }

  logger.info('EVENT blojs:verify', `Bloj was verified`, bloj);

  res.send({
    ack: true,
  });
});

module.exports = router;
