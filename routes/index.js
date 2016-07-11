var express = require('express');
var message = require('./message.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
  {
      title: 'Tortie',
      validationErrorMessage: message.getMessage("validationError"),
      viewMessage: message.getViewMessage("index")
  });
});

module.exports = router;
