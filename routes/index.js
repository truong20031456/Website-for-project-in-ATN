var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Fruits Shop', backgroundColor: 'lightblue' }); // Add a new property for background color
});

module.exports = router;

