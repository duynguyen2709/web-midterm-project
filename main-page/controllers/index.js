var category=require('../model/category.js')
var product=require('../model/product')
// Display list of all products.
exports.display_hp = async function(req, res) {     
    
    if(category.listCategory==null)
    {
        await category.getListCategory();  
    }
    if(product.promoProduct==null)
    {
        await product.getPromoProduct(); 
    }
    
    res.render('home/homepage', {title: 'Daily Shop', listCategory: category.listCategory , productOfPromo:product.promoProduct });
 
};
