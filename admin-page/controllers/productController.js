var product=require('../models/productModel');

exports.index = function(req, res) {
    
    res.render('product/product', { title: 'Admin Page'});
};

exports.getListProduct = async function(req,res){

    const listProduct = await product.productList();
    res.send(JSON.stringify(listProduct));
}
// Display list of all products.
exports.product_list = function(req, res) {
    res.send('NOT IMPLEMENTED: product list');
};

// Display detail page for a specific product.
exports.product_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: product detail: ' + req.params.id);
};

// Handle product create on POST.
exports.product_create = function(req, res) {
    res.send('NOT IMPLEMENTED: product create POST');
};

// Display product delete form on delete.
exports.product_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: product delete DELETE');
};

// Handle product update on POST.
exports.product_update = function(req, res) {
    res.send('NOT IMPLEMENTED: product update PUT');
};