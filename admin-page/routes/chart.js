var express = require('express');
var router = express.Router();

var chartController = require('../controllers/chartController');

router.post('/', chartController.index);

module.exports = router;
