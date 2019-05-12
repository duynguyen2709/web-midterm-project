var category=require('../model/category')
// Display list of all products.
exports.product_list = async function(req, res) {     
    if ( category.listCategory== null)     
    {         
        await category.getListCategory();     
    }
    res.send('NOT IMPLEMENTED: Product list');
};

// Display list of all products of specific type.
exports.product_list_type = async function(req, res) {     
    if ( category.listCategory== null)     
    {         
        await category.getListCategory();     
    }
    const type=req.body.type;
    res.render('product/product',{listCategory: category.listCategory});
};

// Display detail page for a specific product.
exports.product_detail = async function(req, res) {     
    if ( category.listCategory== null)     
    {         
        await category.getListCategory();     
    }
    //const type=req.body.id;
    res.render('product/product_detail'/*,{id: id}*/,{listCategory: category.listCategory})
};


// Handle product update on POST.
exports.product_update_post = async function(req, res) {     
    if ( category.listCategory== null)     
    {         
        await category.getListCategory();     
    }
    res.send('NOT IMPLEMENTED: product update POST');
};

exports.search=function(req,res){
    const dataSearch=req.body.data;
    //handle search;
    res.send('NOT IMPLEMENTED: product search');
}