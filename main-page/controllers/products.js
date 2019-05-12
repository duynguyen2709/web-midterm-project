var category=require('../model/category')

// // Display list of all products.
// exports.product_list = function(req, res) {
//     res.send('NOT IMPLEMENTED: Product list');
// };

// // Display list of all products of specific type.
// exports.product_list_type = function(req, res) {
//     const type=req.body.type;
//     console.log("sadasdasd");
//     res.render('product/product',{type: type});
// };
var request = require('request')
// const url = 'https://api-scttshop.herokuapp.com/api/categories/1/products'
const url = 'https://api-scttshop.herokuapp.com/api/categories/';
//
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
    var urlProduct= url+req.query.id+'/products';
    console.log("Temp: ",urlProduct);
    var info;
    request(urlProduct, (error, response, body)=> {
        if (!error && response.statusCode === 200) {
        info = JSON.parse(body)
        res.render('product/product',{info: info});
        } else {
        console.log("Got an error: ", error, ", status code: ", response.statusCode)
        }
    });
    
    
    
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