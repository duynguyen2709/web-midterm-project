var express = require('express');
var router = express.Router();

var orderController = require('../controllers/orderController');

router.get('/', orderController.index);

//POST request for creating order.
router.post('/orders/create', orderController.order_create);

// DELETE request to delete order.
router.delete('/orders/:id/delete', orderController.order_delete);

// PUT request to update order.
router.put('/orders/:id/update', orderController.order_update);

// GET request for one order.
router.get('/orders/:id', orderController.order_detail);

// GET request for list of all order.
router.get('/orders', orderController.order_list);

module.exports = router;