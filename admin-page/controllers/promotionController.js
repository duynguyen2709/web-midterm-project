var promotion=require('../models/promotionModel');
var productModel = require('../models/productModel');

var listProduct = null;

exports.index = function(req, res) {
    
    res.render('promotion/promotion', { title: 'Admin Page'});
    listProduct = productModel.productList();
};

exports.getListPromotion = async function(req,res){

    const listpromotion = await promotion.promotionList();
    res.send(JSON.stringify(listpromotion));

}
// Display list of all promotions.
exports.promotion_list = function(req, res) {
    res.send('NOT IMPLEMENTED: promotion list');
};

// Display detail page for a specific promotion.
exports.promotion_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: promotion detail: ' + req.params.id);
};

// Handle promotion create on POST.
exports.promotion_create = function(req, res) {
    res.send('NOT IMPLEMENTED: promotion create POST');
};

// Display promotion delete form on delete.
exports.promotion_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: promotion delete DELETE');
};

// Handle promotion update on POST.
exports.promotion_update = function(req, res) {
    res.send('NOT IMPLEMENTED: promotion update PUT');
};