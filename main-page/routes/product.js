var express = require('express');
var router = express.Router();
var product_controller = require('../controllers/products.js');

/*GET my account page.*/
router.get('/detail',product_controller.product_detail);

router.get('/update', product_controller.product_update_post);

router.get('/type',product_controller.product_list_type);
router.get('/search',product_controller.search);

module.exports = router;
