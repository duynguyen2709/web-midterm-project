
// Display list of all products of specific type.
exports.get_detail = function(req, res) {
    //const type=req.body.userid;
    res.render('checkout/checkout'/*,{userid: userid}*/);
};

// Display detail page for a specific product.
exports.submit_checkout_post = function(req, res) {
    res.send('NOT IMPLEMENTED: submit checkout POST');
};

