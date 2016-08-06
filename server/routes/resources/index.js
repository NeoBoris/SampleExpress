var express = require('express');
var message = require('../message.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(
  {
      message: message.getViewMessage("index")
  });
});

module.exports = router;