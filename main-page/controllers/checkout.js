var category=require('../model/category')
var user=require('./user')
// Display list of all products of specific type.
exports.get_detail = async function(req, res) {            
    let listCategories=await category.getListCategory();  
    let  curUser =req.session.user 
    let list;
        if(req.session.cart){
            list = req.session.cart.array;
            res.render('checkout/checkout',{listCategory: listCategories, user: curUser,list:list});
        }else{
            res.render('checkout/checkout',{listCategory: listCategories, user: curUser,list:null});
        }
    
    
};

// Display detail page for a specific product.
exports.submit_checkout_post = async function(req, res) {     
    let listCategories=await category.getListCategory();  
    let  curUser =req.session.user
    res.send('NOT IMPLEMENTED: submit checkout POST');
};


