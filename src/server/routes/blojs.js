const express = require('express');
const router = express.Router();
const chain = require('../../lib/chain');

/**
 * @swagger
 * /blojs:
 *   get:
 *     description: Get all blojs
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Blojs
 */
router.get('/', function(req, res) {
  res.send(chain.get());
});

module.exports = router;
