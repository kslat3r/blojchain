const express = require('express');
const router = express.Router();
const logger = require('../../logger');
const confirmer = require('../../confirmer');

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

  confirmer.push(bloj);

  logger.info('EVENT confirm', 'Added bloj to confirmer');
  logger.debug(bloj);

  res.send({
    ack: true,
  });
});

module.exports = router;
