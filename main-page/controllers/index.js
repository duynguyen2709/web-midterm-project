var category=require('../model/category.js')
var product=require('../model/product')
var user=require('./user')
// Display list of all products.
exports.display_hp = async function(req, res) {     
    
    let listCategories=await category.getListCategory();   
    if(product.promoProduct==null)
    {
        await product.getPromoProduct(); 
    }
    let curUser=null
    curUser=req.session.user
    console.log(curUser)
    res.render('home/homepage', {title: 'Daily Shop', listCategory: listCategories , productOfPromo:product.promoProduct, user: curUser});
 
};
