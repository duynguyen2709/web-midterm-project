var category=require('../model/category')
// Display list of all products of specific type.
exports.user_order_list = async function(req, res) {     
    if ( category.listCategory== null)     
    {         
        await category.getListCategory();     
    }
    //const type=req.body.userid;
    res.render('order/customer_orders',{listCategory: category.listCategory});
};

// Display detail page for a specific product.
exports.order_detail = async function(req, res) {     
    if ( category.listCategory== null)     
    {         
        await category.getListCategory();     
    }
    //const type=req.body.id;
    res.render('order/order_detail',{listCategory: category.listCategory})
};


exports.product_create_post = async function(req, res) {     
    if ( category.listCategory== null)     
    {         
        await category.getListCategory();     
    }
    res.send('NOT IMPLEMENTED: product create POST');
};
