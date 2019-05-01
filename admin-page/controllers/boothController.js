exports.index = function(req, res) {
    res.render('layouts/product', { title: 'Admin Page' });
};

// Display list of all booths.
exports.booth_list = function(req, res) {
    res.send('NOT IMPLEMENTED: booth list');
};

// Display detail page for a specific booth.
exports.booth_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: booth detail: ' + req.params.id);
};

// Handle booth create on POST.
exports.booth_create = function(req, res) {
    res.send('NOT IMPLEMENTED: booth create');
};

// Display booth delete form.
exports.booth_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: booth delete');
};

// Display booth update form.
exports.booth_update = function(req, res) {
    res.send('NOT IMPLEMENTED: booth update');
};
