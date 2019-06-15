var category = require('../model/category')
var product = require('../model/product')
var user = require('./user')
var axios = require('axios');

exports.product_list = async function (req, res) {

    console.log("get into product_list");
    const categoryID = req.body.categoryID;

    const listProduct = await product.getProductOfCategory(categoryID);

    res.json({
        info: listProduct
    });
}

// Display list of all products of specific type.
exports.product_list_type = async function (req, res) {
    let listCategories = await category.getListCategory();
    var type = req.query.id;
    let curUser = req.session.user;

    const listProduct = await product.getProductOfCategory(type);
    res.render('product/product', {
        info: listProduct,
        listCategory: listCategories,
        user: curUser,
        length: listProduct.length,
        type: type
    });
};

// Display detail page for a specific product.
exports.product_detail = async function (req, res) {
    let listCategories = await category.getListCategory();
    var productId = req.query.id
    const productInfo = await product.getProductDetail(productId)
    let curUser = null
    curUser=req.session.user
    res.render('product/product_detail', {
        productInfo: productInfo,
        listCategory: listCategories,
        user: curUser
    })
};


// Handle product update on POST.
exports.product_update_post = async function (req, res) {
    let listCategories = await category.getListCategory();
    res.send('NOT IMPLEMENTED: product update POST');
};

exports.search = async function (req, res) {
    let listCategories = await category.getListCategory();
    let curUser = null
    curUser=req.session.user
    res.render('product/product_search', {
        listCategory: listCategories,
        user: curUser
    })
}

exports.search_post = async function (req, res) {
    let listCategories = await category.getListCategory();
    var productId = req.query.id
    const productInfo = await product.getProductDetail(productId)
    let curUser = null
    curUser=req.session.user
   let query=req.body.query
   let type=req.body.category
   let min=req.body.minVal
   let max=req.body.maxVal
   let check=null
   if(req.body.promotion!="undefined")
   {
     check=true
   }
   else check=false
   await axios({
    method: 'POST',
    url: 'https://api-scttshop-v2.herokuapp.com/api/products/search',
    data: {
     productName: query,
     categoryID: type,
     minPrice: min,
     maxPrice:max,
     isOnPromotion: check
    }
}).then((response)=>{
    res.render('product/product', {
        info: response.data,
        listCategory: listCategories,
        user: curUser,
        length: response.data.length,
        type: ""
    });

})
.catch(err => {
    console.log(err)
    //res.render('user/my_account',{listCategory: listCategories, user: currentUser ,code: "-1"});
}) 

}