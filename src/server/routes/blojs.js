const express = require('express');
const router = express.Router();
const chain = require('../../chain');

router.get('/', function(req, res) {
  res.send(chain.get());
});

module.exports = router;
