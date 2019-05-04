var express = require('express');
var router = express.Router();
var order_controller = require('../controllers/order.js');

router.get('/detail',order_controller.order_detail);

router.get('/create', order_controller.product_create_post);

router.get('/list',order_controller.user_order_list);
//router.get('/search',product_controller.search);

module.exports = router;