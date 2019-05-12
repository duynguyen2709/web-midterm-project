var category=require('../model/category')
exports.view_detail = async function(req, res) {
    if ( category.listCategory== null)
    {
        await category.getListCategory();
    }
    res.render('user/account_detail',{listCategory: category.listCategory});
}
// Display book create form on GET.
exports.user_create_get = async function(req, res) {
    if ( category.listCategory== null)
    {
        await category.getListCategory();
    }
    res.render('user/my_account',{listCategory: category.listCategory});
};
exports.user_create_post = async function(req, res) {
    if ( category.listCategory== null)
    {
        await category.getListCategory();
    }
    res.render('user/my_account',{listCategory: category.listCategory});
};

// Display book update form on GET.
exports.user_update_get = async function(req, res) {
    if ( category.listCategory== null)
    {
        await category.getListCategory();
    }
    res.render('user/account_detail',{listCategory: category.listCategory});
};
// Handle book update on POST.
exports.user_update_post = async function(req, res) {
    if ( category.listCategory== null)
    {
        await category.getListCategory();
    }
    res.render('user/account_detail',{listCategory: category.listCategory});
};
