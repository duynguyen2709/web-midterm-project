var category=require('../model/category')
var user=require('./user')
// Display list of all products of specific type.
exports.user_order_list = async function(req, res) {     
    let listCategories=await category.getListCategory();   
    let  curUser =req.session.user
    let data = await fetch("https://api-scttshop-v2.herokuapp.com/api/customers/" + curUser.email)
    let user = await data.json()
    res.render('order/customer_orders',{listCategory: listCategories, user:curUser, listOrders: user.orders});
};

// Display detail page for a specific product.
exports.order_detail = async function(req, res) {     
    let listCategories=await category.getListCategory();   
    let id=req.query.id;
    let  curUser =req.session.user
    let data = await fetch("https://api-scttshop-v2.herokuapp.com/api/orders/" + id)
    let order = await data.json()
    res.render('order/order_detail',{listCategory: listCategories,user: curUser,order:order})
};


exports.product_create_post = async function(req, res) {     
    let listCategories=await category.getListCategory();   
    let  curUser =req.session.user
    res.send('NOT IMPLEMENTED: product create POST');
};
