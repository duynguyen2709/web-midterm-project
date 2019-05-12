var express = require('express');
var router = express.Router();
var index=require('../controllers/index.js')

var request = require('request')
const url = 'https://api-scttshop.herokuapp.com/api/categories/1/products'

/* GET home page. */
router.get('/', index.display_hp);

module.exports = router;
