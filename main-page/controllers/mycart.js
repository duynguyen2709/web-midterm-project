var category=require('../model/category')
// Display list of all products of specific type.
exports.get_detail =async function(req, res) {
    if ( category.listCategory== null)
    {
        await category.getListCategory();
    }
    res.send('NOT IMPLEMENTED: my cart get detail',{listCategory: category.listCategory});
};

exports.get_page = async function(req, res) {
    if ( category.listCategory== null)
    {
        await category.getListCategory();
    }
    res.render('mycart/my_cart.ejs',{listCategory: category.listCategory});
};
// Display detail page for a specific product.
exports.apply_coupon =async function(req, res) {
    if ( category.listCategory== null)
    {
        await category.getListCategory();
    }
    res.send('NOT IMPLEMENTED: apply coupon');
};

exports.update =async function(req, res) {
    if ( category.listCategory== null)
    {
        await category.getListCategory();
    }
    res.send('NOT IMPLEMENTED: update');
};

exports.proceed_to_checkout =async function(req, res) {
    if ( category.listCategory== null)
    {
        await category.getListCategory();
    }
    res.render('/check-out/checkout.ejs',{listCategory: category.listCategory});
};