const express = require('express');
const router = express.Router();
const logger = require('../../logger');
const miner = require('../../miner');
const verifier = require('../../verifier');
const confirmer = require('../../confirmer');

/**
 * @swagger
 * /queues/miner:
 *   get:
 *     description: Get miner queue
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Miner queue
 */
router.get('/queues/miner', function(req, res) {
  logger.debug('EVENT minerQueue:get');

  res.send(miner.getQueue());
});

/**
 * @swagger
 * /queues/verifier:
 *   get:
 *     description: Get verifier queue
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Verifier queue
 */
router.get('/queues/verifier', function(req, res) {
  logger.debug('EVENT verifierQueue:get');

  res.send(verifier.getQueue());
});

/**
 * @swagger
 * /queues/confirmer:
 *   get:
 *     description: Get confirmer queue
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Confirmer queue
 */
router.get('/queues/confirmer', function(req, res) {
  logger.debug('EVENT confirmerQueue:get');

  res.send(confirmer.getQueue());
});

module.exports = router;
