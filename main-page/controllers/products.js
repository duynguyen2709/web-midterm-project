var category = require('../model/category')
var product = require('../model/product')
var user = require('./user')

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
    curUser = user.currentUser()
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

exports.search = function (req, res) {
    const dataSearch = req.body.data;
    //handle search;
    res.send('NOT IMPLEMENTED: product search');
}