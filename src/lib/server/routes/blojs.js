const express = require('express');
const router = express.Router();
const logger = require('../../logger');
const chain = require('../../chain');
const hasher = require('../../hasher');
const blojVerifier = require('../../verifiers/bloj');
const miner = require('../../miner');

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

  res.send(hasher(JSON.stringify(chain.get())));
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
  const lastBloj = chain.getLast();

  // sanity check

  if (bloj.index > lastBloj.index + 1) {
    throw new Error('Bloj received does not increment last index');
  }

  if (lastBloj.hash !== bloj.prevHash) {
    throw new Error('Bloj received does not match last bloj hash');
  }

  if (!blojVerifier(bloj)) {
    throw new Error('Bloj could not be verified');
  }

  logger.info('EVENT bloj:add', 'Bloj added to chain', bloj);

  chain.add(bloj);
  res.send(bloj);
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
  const lastBloj = chain.getLast();

  // sanity check

  if (bloj.index > lastBloj.index + 1) {
    throw new Error('Bloj received does not increment last index');
  }

  if (lastBloj.hash !== bloj.prevHash) {
    throw new Error('Bloj received does not match last bloj hash');
  }

  let mined;

  try {
    mined = miner(bloj);
  } catch (e) {
    throw e;
  }

  logger.info('EVENT bloj:mine', `Bloj was mined`, bloj);

  chain.add(mined);
  res.send(mined);
});

module.exports = router;
