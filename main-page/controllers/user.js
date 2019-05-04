exports.view_detail = function(req, res, next) {
    res.render('account_detail');
}


// Display book create form on GET.
exports.user_create_get = function(req, res) {
    res.render('my_account');
};
exports.user_create_post = function(req, res) {
    res.render('my_account');
};

// Display book update form on GET.
exports.user_update_get = function(req, res) {
    res.render('account_detail');
};
// Handle book update on POST.
exports.user_update_post = function(req, res) {
    res.render('account_detail');
};
