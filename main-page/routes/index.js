var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/homepage', { title: 'Daily Shop' });
});

/*GET my account page.*/
router.get('/my-cart', function(req, res, next) {
  res.render('my_cart');
});
router.get('/check-out', function(req, res, next) {
  res.render('checkout' );
});
module.exports = router;
