var express = require('express');
var router = express.Router();

var promotionController = require('../controllers/promotionController');

router.get('/', promotionController.index);

router.get('/get',promotionController.getListPromotion);

//POST request for creating promotion.
router.post('/promotions/create', promotionController.promotion_create);

// DELETE request to delete promotion.
router.delete('/promotions/:id/delete', promotionController.promotion_delete);

// PUT request to update promotion.
router.put('/promotions/:id/update', promotionController.promotion_update);

// GET request for one promotion.
router.get('/promotions/:id', promotionController.promotion_detail);

// GET request for list of all promotion.
router.get('/promotions', promotionController.promotion_list);

module.exports = router;
