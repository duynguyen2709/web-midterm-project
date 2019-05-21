var express = require('express');
var router = express.Router();

var promotionController = require('../controllers/promotionController');

router.get('/', promotionController.index);

router.get('/get/:promotionID',promotionController.getPromotion);

router.get('/get',promotionController.getListPromotion);

router.post('/delete',promotionController.deletePromotion);

router.post('/insert',promotionController.insertPromotion);

router.post('/update',promotionController.updatePromotion);


module.exports = router;
