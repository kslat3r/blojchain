const express = require('express');
const router = express.Router();
const logger = require('../../logger');
const chain = require('../../chain');
const hash = require('../../helpers/hash');
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
  logger.debug('EVENT blojs:get');

  res.send(chain.selectAll());

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
router.post('/', async function(req, res) {
  logger.debug('EVENT blojs:create');

  const bloj = Object.assign({}, req.body, {
    timestamp: new Date().getTime(),
  });

  const responses = await blojsRequests.mineByPeers(node.getPeers(), bloj);

  logger.info('EVENT blojs:create', 'Bloj was sent to peers for mining', responses);

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
  logger.debug('EVENT blojs:mine');

  const bloj = req.body;

  miner.push(bloj);

  logger.info('EVENT blojs:mine', `Added bloj to miner`, bloj);

  res.send({
    ack: true,
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
  logger.debug('EVENT blojs:verify');

  const bloj = req.body;

  if (!blojVerifier(bloj)) {
    throw new Error('Bloj could not be verified');
  }

  miner.remove(bloj);

  logger.info('EVENT blojs:verify', `Bloj was verified`, bloj);

  res.send({
    ack: true,
  });
});

module.exports = router;
