const express = require('express');
const router = express.Router();
const logger = require('../../logger');
const chain = require('../../chain');
const hasher = require('../../hasher');
const blojVerifier = require('../../verifiers/bloj');
const miner = require('../../miner');
const blojsRequests = require('../../requests/blojs');

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
 * /blojs:
 *   post:
 *     description: Add or mine a bloj
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
router.post('/', function(req, res) {
  logger.info('EVENT blojs:post');

  const bloj = req.body;
  const lastBloj = chain.getLast();

  // sanity check

  if (bloj.index > lastBloj.index + 1) {
    throw new Error('Bloj received does not increment last index by 1');
  }

  if (lastBloj.hash !== bloj.prevHash) {
    throw new Error('Bloj received does not match last bloj hash');
  }

  // needs verifying?

  if (bloj.hash && bloj.nonce) {
    logger.info('EVENT blojs:verify');

    if (!blojVerifier(bloj)) {
      throw new Error('Bloj could not be verified');
    }

    logger.info('EVENT bloj:add', 'Bloj added to chain', bloj);

    chain.add(bloj);
    res.send(bloj);
  }

  // needs mining?

  if (!bloj.hash || !bloj.nonce) {
    logger.info('EVENT blojs:mine');

    let mined;

    try {
      mined = miner(bloj);
    } catch (e) {
      throw e;
    }

    logger.info('EVENT bloj:mine', `Bloj was mined`, bloj);

    chain.add(mined);
    res.send(mined);

    blojsRequests.postToPeers(require('../../instance').getNode().getPeers(), bloj);
  }
});

module.exports = router;
