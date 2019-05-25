var category=require('../model/category')
var user=require('./user')
// Display list of all products of specific type.
exports.get_detail =async function(req, res) {
    let listCategories=await category.getListCategory();   
    let curUser=null
    curUser=user.currentUser()
    res.send('NOT IMPLEMENTED: my cart get detail',{listCategory: listCategories, user:curUser});
};

exports.get_page = async function(req, res) {
    let listCategories=await category.getListCategory();   
    let curUser=null
    curUser=user.currentUser()
    res.render('mycart/my_cart.ejs',{listCategory: listCategories, user:curUser});
};
// Display detail page for a specific product.
exports.apply_coupon =async function(req, res) {
    let listCategories=await category.getListCategory();   
    res.send('NOT IMPLEMENTED: apply coupon');
};

exports.update =async function(req, res) {
    let listCategories=await category.getListCategory();   s.send('NOT IMPLEMENTED: update');
};

exports.proceed_to_checkout =async function(req, res) {
    let listCategories=await category.getListCategory();  
    let curUser=null
    curUser=user.currentUser() 
    res.render('/check-out/checkout.ejs',{listCategory: listCategories, user:curUser});
};