var category=require('../model/category')
var user=require('./user')
var Cart=require('../model/cart').Cart
// Display list of all products of specific type.
exports.get_detail =async function(req, res) {
    let listCategories=await category.getListCategory();   
    let  curUser =req.session.user
    res.send('NOT IMPLEMENTED: my cart get detail',{listCategory: listCategories, user:curUser});
};

exports.get_page = async function(req, res) {
    let listCategories=await category.getListCategory();   
    let  curUser =req.session.user
    // let listProductCart=req.session.cart;
    res.render('mycart/my_cart.ejs',{listCategory: listCategories, user:curUser/*,list:listProductCart*/});
};
// Display detail page for a specific product.
exports.apply_coupon =async function(req, res) {
    let listCategories=await category.getListCategory();   
    res.send('NOT IMPLEMENTED: apply coupon');
};

exports.update =async function(req, res) {
    let listCategories=await category.getListCategory();   s.send('NOT IMPLEMENTED: update');
};
exports.addProduct=async function(req,res){
    // console.log("asdsa");
    // var cart= await new Cart(req.session.cart?req.session.cart:{});
    // cart.add();
    // req.session.cart=await cart;
    // console.log(req.session.cart.count);
    // let type=await req.params.id;
    // console.log(req.params.id+","+req.params.image+","+req.params.name+","+req.params.price);
    // res.redirect('/products/type?id='+type);
    var cart= await new Cart(req.session.cart?req.session.cart:{});
    cart.add(req.body.image,req.body.name,req.body.price);
    req.session.cart= await cart;
    req.session.cart.print();
    res.redirect('/');
    
};

exports.proceed_to_checkout =async function(req, res) {
    let listCategories=await category.getListCategory();  
    let  curUser =req.session.user
    res.render('/check-out/checkout.ejs',{listCategory: listCategories, user:curUser});
};