exports.index = function(req, res) {
    res.render('user/user', { title: 'Admin Page' });
};

// Display list of all users.
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: user list');
};

// Display detail page for a specific user.
exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: user detail: ' + req.params.id);
};

// Display user create form on GET.
exports.user_create = function(req, res) {
    res.send('NOT IMPLEMENTED: user create');
};

// Display user delete form on GET.
exports.user_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: user delete');
};

// Display user update form on GET.
exports.user_update = function(req, res) {
    res.send('NOT IMPLEMENTED: user update');
};
