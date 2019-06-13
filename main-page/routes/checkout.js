var express = require('express');
var router = express.Router();
var checkout_controller = require('../controllers/checkout.js');

router.get('/',checkout_controller.get_detail);

router.get('/submit', checkout_controller.submit_checkout_post);

router.post('/',checkout_controller.get_detail);

router.post('/postOrder',checkout_controller.postOrder);

module.exports = router;
