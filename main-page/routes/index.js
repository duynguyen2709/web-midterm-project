var express = require('express');
var router = express.Router();
var index=require('../controllers/index.js')

/* GET home page. */
router.get('/', index.display_hp);

module.exports = router;
