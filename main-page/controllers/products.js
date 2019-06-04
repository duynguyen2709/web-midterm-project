var category=require('../model/category')
var product=require('../model/product')
var user=require('./user')

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
const url = 'https://api-scttshop-v2.herokuapp.com/api/categories/';
//
// Display list of all products.
exports.product_list = async function(req, res) {     
    let listCategories=await category.getListCategory();   
    res.send('NOT IMPLEMENTED: Product list');
};

// Display list of all products of specific type.
exports.product_list_type = async function(req, res) {     
    let listCategories=await category.getListCategory();  
    var type=req.query.id; 
    var urlProduct= url+req.query.id+'/products';
    var info;
    let  curUser =req.session.user
    request(urlProduct, (error, response, body)=> {
        if (!error && response.statusCode === 200) {
        info = JSON.parse(body)
        res.render('product/product',{info: info,listCategory: listCategories,user: curUser,length:info.length,type:type});
        } else {
        console.log("Got an error: ", error, ", status code: ", response.statusCode)
        }
    });
    
    
    
};


// Display detail page for a specific product.
exports.product_detail = async function(req, res) {     
    let listCategories=await category.getListCategory();   
    var productId= req.query.id
    const productInfo= await product.getProductDetail(productId)   
    let curUser=null
    curUser=user.currentUser()
    res.render('product/product_detail',{productInfo:productInfo, listCategory: listCategories, user: curUser})
};


// Handle product update on POST.
exports.product_update_post = async function(req, res) {     
    let listCategories=await category.getListCategory();   
    res.send('NOT IMPLEMENTED: product update POST');
};

exports.search=function(req,res){
    const dataSearch=req.body.data;
    //handle search;
    res.send('NOT IMPLEMENTED: product search');
}