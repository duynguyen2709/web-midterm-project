var express = require('express');
var router = express.Router();
// Require controller modules.
var chartController = require('../controllers/chartController');

router.get('/', chartController.index);

module.exports = router;


