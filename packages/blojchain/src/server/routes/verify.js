const express = require('express');
const router = express.Router();
const logger = require('../../logger');
const verifier = require('../../verifier');

/**
 * @swagger
 * /verify:
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
  logger.debug('EVENT verify');

  const bloj = req.body;

  verifier.push(bloj);

  logger.info('EVENT verifiy', 'Added bloj to verifier');
  logger.debug(bloj);

  res.send({
    ack: true,
  });
});

module.exports = router;
