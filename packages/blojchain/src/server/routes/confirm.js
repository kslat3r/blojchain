const express = require('express');
const router = express.Router();
const logger = require('../../logger');

/**
 * @swagger
 * /confirm:
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
router.post('/confirm', function(req, res) {
  logger.debug('EVENT confirm');

  const bloj = req.body;

  logger.info('EVENT confirm', `Added bloj to miner`, bloj);

  res.send({
    ack: true,
  });
});

module.exports = router;
