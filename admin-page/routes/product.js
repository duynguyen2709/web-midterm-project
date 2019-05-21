var express = require('express');
var router = express.Router();

var productController = require('../controllers/productController');


router.get('/', productController.index);

router.get('/get/:productID',productController.getProduct);

router.get('/get',productController.getListProduct);

router.post('/delete',productController.deleteProduct);

router.post('/insert',productController.insertProduct);

router.post('/update',productController.updateProduct);

module.exports = router;
