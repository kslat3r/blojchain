const express = require('express');
const router = express.Router();
const logger = require('../../logger');
const chain = require('../../chain');
const onUpdate = require('../../events/on-update');

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

  const id = bloj.id;
  const found = chain.selectBy({ id });
  const confirmations = found.confirmations.concat(bloj.confirmations)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const updated = chain.updateBy({ id }, { confirmations });

  logger.info('EVENT confirm', `Bloj has been confirmed`, updated);

  res.send({
    ack: true,
  });

  setTimeout(() => {
    onUpdate(updated);
  }, 5000);
});

module.exports = router;
