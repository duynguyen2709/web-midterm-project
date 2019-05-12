var express = require('express');
var router = express.Router();

var request = require('request')
const url = 'https://api-scttshop.herokuapp.com/api/categories/1/products'

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home/homepage', { title: 'Daily Shop'});  
});

module.exports = router;
