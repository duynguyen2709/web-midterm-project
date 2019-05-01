var express = require('express');
var router = express.Router();

var productController = require('../controllers/productController');

router.get('/', productController.index);

//POST request for creating product.
router.post('/products/create', productController.product_create);

// DELETE request to delete product.
router.delete('/products/:id/delete', productController.product_delete);

// PUT request to update product.
router.put('/products/:id/update', productController.product_update);

// GET request for one product.
router.get('/products/:id', productController.product_detail);

// GET request for list of all product.
router.get('/products', productController.product_list);

module.exports = router;
