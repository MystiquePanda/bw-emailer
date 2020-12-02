var express = require('express');
var router = express.Router();

router.post('/email', function(req, res, next) {
  res.status(200).json({})
});

module.exports = router;
