var category=require('../model/category')
// Display list of all products of specific type.
exports.get_detail = async function(req, res) {     
    if ( category.listCategory== null)     
    {         
        await category.getListCategory();     
    }
    //const type=req.body.userid;
    res.render('checkout/checkout',{listCategory: category.listCategory});
};

// Display detail page for a specific product.
exports.submit_checkout_post = async function(req, res) {     
    if ( category.listCategory== null)     
    {         
        await category.getListCategory();     
    }
    res.send('NOT IMPLEMENTED: submit checkout POST');
};

