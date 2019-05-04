
// Display list of all products of specific type.
exports.user_order_list = function(req, res) {
    //const type=req.body.userid;
    res.render('order/customer_orders'/*,{userid: userid}*/);
};

// Display detail page for a specific product.
exports.order_detail = function(req, res) {
    //const type=req.body.id;
    res.render('order/order_detail'/*,{id: id}*/)
};


exports.product_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: product create POST');
};
