var express = require('express');
var router = express.Router();
// Require controller modules.
var boothController = require('../controllers/boothController');
var orderController = require('../controllers/orderController');
var productController = require('../controllers/productController');
var userController = require('../controllers/userController');

/* GET home page. */
router.post('/', function(req, res, next) {
  res.render('main', { title: 'Admin Page' });
});

/// user ROUTES ///

router.get('/', userController.index);

// POST request for creating user.
router.post('/users/create', userController.user_create);

// DELETE request to delete user.
router.delete('/users/:id/delete', userController.user_delete);

// PUT request to update user.
router.put('/users/:id/update', userController.user_update);

// GET request for one user.
router.get('/users/:id', userController.user_detail);

// GET request for list of all user items.
router.get('/users', userController.user_list);

/// booth ROUTES ///

// GET request for creating booth. NOTE This must come before route for id (i.e. display booth).
router.post('/booths/create', boothController.booth_create);

// DELETE request to delete booth.
router.delete('/booths/:id/delete', boothController.booth_delete);

// PUT request to update booth.
router.put('/booths/:id/update', boothController.booth_update);

// GET request for one booth.
router.get('/booths/:id', boothController.booth_detail);

// GET request for list of all booths.
router.get('/booths', boothController.booth_list);


/// order ROUTES ///

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


/// product ROUTES ///

//POST request for creating product.
router.post('/products/create', productController.product_create_post);

// DELETE request to delete product.
router.delete('/products/:id/delete', productController.product_delete);

// PUT request to update product.
router.put('/products/:id/update', productController.product_update);

// GET request for one product.
router.get('/products/:id', productController.product_detail);

// GET request for list of all product.
router.get('/products', productController.product_list);


module.exports = router;


