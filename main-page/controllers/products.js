var category = require('../model/category')
var product = require('../model/product')
var user = require('./user')

exports.product_list = async function (req, res) {
    const categoryID = req.body.categoryID;
    var listProductReal=new Array();
    const listProduct = await product.getProductOfCategory(categoryID);
    if(req.body.filterName=="Tất cả"){
        res.json({
            info: listProduct
        });
    }
    else{   
        for (let i=0;i < listProduct.length ;i++){
        if(listProduct[i].manufacturer===req.body.filterName)
        listProductReal.push(listProduct[i]);
        }
        res.json({
            info: listProductReal
        });
        console.log(listProductReal);
    }
    
    
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
        type: type,
        listType: null,
        manufaceturerName: null
    });
};

// Display list of all products of specific type (Filter).
exports.product_list_type_filter = async function (req, res) {
    // let unique = [...new Set(listType)];
    // let listTypeReal=Array();
    // listTypeReal=Array.from(unique);
    var body;
    var listType=[];
    let listCategories = await category.getListCategory();
    var type = req.body.type;
    let curUser = req.session.user;
    let valueFilter=req.body.value;
    const listProduct = await product.getProductOfCategory(type);
    var listProduct1= new Array();
    var listProductReal=new Array();
    listProduct1=listProduct;
    for (let i=0;i < listProduct1.length ;i++){
        listType.push(listProduct1[i].manufacturer);
        if(listProduct1[i].manufacturer===valueFilter)
        listProductReal.push(listProduct1[i]);
    }
    var uniq = [...new Set(listType)];
    // var tmp=listType.push("asd");
    // console.log(JSON.stringify(listType));
    
    if(valueFilter=="Tất cả"){
        res.render('product/product', {
            info: listProduct,
            listCategory: listCategories,
            user: curUser,
            length: listProduct.length,
            type: type,
            listType : null,
            manufaceturerName: null
        });
    }
    else{
        res.render('product/product', {
        info: listProductReal,
        listCategory: listCategories,
        user: curUser,
        length: listProductReal.length,
        type: type,
        listType : uniq,
        manufaceturerName:req.body.filterName
    });
    }
    
    
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