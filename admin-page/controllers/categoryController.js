var category=require('../models/categoryModel');

exports.index = function(req, res) {
    category.categoryList;
    res.render('category/category', { title: 'Admin Page' });
};

// Display list of all categories.
exports.category_list = function(req, res) {
    res.send('NOT IMPLEMENTED: category list');
};

// Display detail page for a specific category.
exports.category_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: category detail: ' + req.params.id);
};

// Handle category create on POST.
exports.category_create = function(req, res) {
    res.send('NOT IMPLEMENTED: category create');
};

// Display category delete form.
exports.category_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: category delete');
};

// Display category update form.
exports.category_update = function(req, res) {
    res.send('NOT IMPLEMENTED: category update');
};
