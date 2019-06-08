var express = require('express');
var router = express.Router();

var orderController = require('../controllers/orderController');

router.get('/', orderController.index);

router.get('/get', orderController.getListOrder);

router.get('/get/:orderID',orderController.getOrder);

router.post('/update',orderController.updateOrder);

module.exports = router;