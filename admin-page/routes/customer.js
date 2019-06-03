var express = require('express');
var router = express.Router();

var customerController = require('../controllers/customerController');

router.get('/', customerController.index);

router.get('/get/:email',customerController.getCustomer);

router.get('/get',customerController.getListCustomer);

router.post('/delete',customerController.deleteCustomer);

router.post('/update',customerController.updateCustomer);

module.exports = router;