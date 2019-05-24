exports.index = function(req, res) {
    res.render('order/order');
};

// Display list of all orders.
exports.order_list = function(req, res) {
    res.send('NOT IMPLEMENTED: order list');
};

// Display detail page for a specific order.
exports.order_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: order detail: ' + req.params.id);
};

// Display order create form on POST.
exports.order_create = function(req, res) {
    res.send('NOT IMPLEMENTED: order create');
};

// Display order delete form on GET.
exports.order_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: order delete');
};

// Display order update form on GET.
exports.order_update = function(req, res) {
    res.send('NOT IMPLEMENTED: order update GET');
};