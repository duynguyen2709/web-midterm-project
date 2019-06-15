var express = require('express');
var router = express.Router();
var cart_controller = require('../controllers/mycart.js');

router.get('/',cart_controller.get_page);

router.get('/applycoupon', cart_controller.apply_coupon);

router.get('/update', cart_controller.update);

router.post('/addproduct',cart_controller.addProduct);

router.post('/removeProduct',cart_controller.removeProduct);

router.post('/updateCount',cart_controller.updateCount);

router.post('/deleteCart',cart_controller.deleteCart);

module.exports = router;