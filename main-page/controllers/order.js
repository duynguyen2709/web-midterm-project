var category=require('../model/category')
var user=require('./user')
// Display list of all products of specific type.
exports.user_order_list = async function(req, res) {     
    let listCategories=await category.getListCategory();   
    let curUser=null
    curUser=user.currentUser()
    res.render('order/customer_orders',{listCategory: listCategories, user:curUser});
};

// Display detail page for a specific product.
exports.order_detail = async function(req, res) {     
    let listCategories=await category.getListCategory();   
    //const type=req.body.id;
    let curUser=null
    curUser=user.currentUser()
    res.render('order/order_detail',{listCategory: listCategories,user: curUser})
};


exports.product_create_post = async function(req, res) {     
    let listCategories=await category.getListCategory();   
    let curUser=null
    curUser=user.currentUser()
    res.send('NOT IMPLEMENTED: product create POST');
};
