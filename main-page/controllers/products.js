var category = require('../model/category')
var product = require('../model/product')
var user = require('./user')
var axios = require('axios');

exports.product_list = async function (req, res) {
    const categoryID = req.body.categoryID;
    var listProductReal = new Array();
    const listProduct = await product.getProductOfCategory(categoryID);
    if (req.body.filterName == "Tất cả") {
        res.json({
            info: listProduct
        });
    } else {
        for (let i = 0; i < listProduct.length; i++) {
            if (listProduct[i].manufacturer === req.body.filterName)
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
        manufaceturerName: null,
        isRenderFilter:true
    });
};

// Display list of all products of specific type (Filter).
exports.product_list_type_filter = async function (req, res) {
    // let unique = [...new Set(listType)];
    // let listTypeReal=Array();
    // listTypeReal=Array.from(unique);
    var body;
    var listType = [];
    let listCategories = await category.getListCategory();
    var type = req.body.type;
    let curUser = req.session.user;
    let valueFilter = req.body.value;
    const listProduct = await product.getProductOfCategory(type);
    var listProduct1 = new Array();
    var listProductReal = new Array();
    listProduct1 = listProduct;
    for (let i = 0; i < listProduct1.length; i++) {
        listType.push(listProduct1[i].manufacturer);
        if (listProduct1[i].manufacturer === valueFilter)
            listProductReal.push(listProduct1[i]);
    }
    var uniq = [...new Set(listType)];
    // var tmp=listType.push("asd");
    // console.log(JSON.stringify(listType));

    if (valueFilter == "Tất cả") {
        res.render('product/product', {
            info: listProduct,
            listCategory: listCategories,
            user: curUser,
            length: listProduct.length,
            type: type,
            listType: null,
            manufaceturerName: null,
            isRenderFilter:true
        });
    } else {
        res.render('product/product', {
            info: listProductReal,
            listCategory: listCategories,
            user: curUser,
            length: listProductReal.length,
            type: type,
            listType: uniq,
            manufaceturerName: req.body.filterName,
            isRenderFilter:true
        });
    }


};

// Display detail page for a specific product.
exports.product_detail = async function (req, res) {
    let listCategories = await category.getListCategory();
    var productId = req.query.id
    const productInfo = await product.getProductDetail(productId)
    let curUser = null
    curUser = req.session.user
    axios({
            method: 'PUT',
            url: 'https://api-scttshop-v2.herokuapp.com/api/products/' + productId + '/view'
        })
        .then(response => {})
        .catch(err => {
            console.log(err);
        });

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
    curUser = req.session.user
    res.render('product/product_search', {
        listCategory: listCategories,
        user: curUser
    })
}

exports.search_post = async function (req, res) {
    let listCategories = await category.getListCategory();
    let curUser = req.session.user
    let query = req.body.query
    let type = req.body.category
    let min = req.body.minVal
    let max = req.body.maxVal
    let check = req.body.promotion
    
    await axios({
            method: 'POST',
            url: 'https://api-scttshop-v2.herokuapp.com/api/products/search',
            data: {
                productName: query,
                categoryID: type,
                minPrice: min,
                maxPrice: max,
                isOnPromotion: check
            }
        }).then((response) => {
            res.render('product/product', {
                info: response.data,
                listCategory: listCategories,
                user: curUser,
                length: response.data.length,
                type: "",
                listType: null,
                manufaceturerName: null,
                isRenderFilter:false
            });

        })
        .catch(err => {
            console.log(err)
            //res.render('user/my_account',{listCategory: listCategories, user: currentUser ,code: "-1"});
        })

}