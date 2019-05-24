var express = require('express');
var router = express.Router();
var userDetailController = require('../controllers/userDetailController');

router.get('/',userDetailController.index);

module.exports = router;