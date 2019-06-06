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
    let listProductCart;
    if(req.session.cart)
    {
        listProductCart=req.session.cart.array;
        console.log("test");
        res.render('mycart/my_cart.ejs',{listCategory: listCategories, user:curUser,list:listProductCart});
    }
    else{
        
        console.log("k co array");
        res.render('mycart/my_cart.ejs',{listCategory: listCategories, user:curUser,list:null});
    }
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
    var cart= await new Cart(req.session.cart?req.session.cart:{});
    cart.add(req.body.image,req.body.name,req.body.price);
    req.session.cart= await cart;
    req.session.cart.print();
    res.json({
        returncode:1
    });
    
};
exports.removeProduct=async function(req,res){
    var cart= await new Cart(req.session.cart?req.session.cart:{});
    cart.remove(req.body.image,req.body.name,req.body.price);
    req.session.cart= await cart;
        res.json({
            cart: req.session.cart.array
        });
    
    
};


exports.proceed_to_checkout =async function(req, res) {
    let listCategories=await category.getListCategory();  
    let  curUser =req.session.user
    res.render('/check-out/checkout.ejs',{listCategory: listCategories, user:curUser});
};