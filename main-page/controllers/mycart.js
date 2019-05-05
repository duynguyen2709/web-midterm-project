
// Display list of all products of specific type.
exports.get_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: my cart get detail');
};

exports.get_page = function(req, res) {
    res.render('mycart/my_cart.ejs');
};
// Display detail page for a specific product.
exports.apply_coupon = function(req, res) {
    res.send('NOT IMPLEMENTED: apply coupon');
};

exports.update = function(req, res) {
    res.send('NOT IMPLEMENTED: update');
};

exports.proceed_to_checkout = function(req, res) {
    res.render('/check-out/checkout.ejs');
};