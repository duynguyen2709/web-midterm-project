var productModel = require('../models/productModel');
var axios = require('axios');
var categoryModel = require('../models/categoryModel');

var listCategory = null;

exports.index = async function (req, res) {

    if (req.isAuthenticated()) {
        listCategory = await categoryModel.categoryList();
        res.render('product/product', {
            listCategory: listCategory,
            user: req.user
        });
    } else {
        res.redirect('/');
    }

};

exports.getListProduct = async function (req, res) {

    const listProduct = await productModel.productList();
    res.send(JSON.stringify(listProduct));
}


exports.getProduct = async function (req, res) {

    const productID = req.params.productID;
    const response = await productModel.getProduct(productID);

    res.send(JSON.stringify(response));
}

exports.deleteProduct = function (req, res) {
    const productID = req.body.productID;

    axios.delete("https://api-scttshop-v2.herokuapp.com/api/products/" + productID)
        .then(response => {
            axios({
                method: 'POST',
                url: process.env.MAIN_PAGE_URL_EVICT_CACHE,
                data: {
                    type: 'PRODUCT'
                }
            })
            res.json({
                data: "Delete Succeed",
                status: 200
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                data: "Delete Failed",
                status: 500
            });
        });
}

exports.insertProduct = function (req, res) {

    let subCategory = null;
    if (req.body.subCategoryID != null)
        subCategory = req.body.subCategoryID;

    axios({
            method: 'POST',
            url: 'https://api-scttshop-v2.herokuapp.com/api/products/',
            data: {
                productName: req.body.productName,
                categoryID: req.body.categoryID,
                subCategoryID: subCategory,
                manufacturer: req.body.manufacturer,
                image: req.body.image,
                description: req.body.description,
                importPrice: req.body.importPrice,
                sellPrice: req.body.sellPrice,
                isActive: req.body.isActive,
                quantity: req.body.quantity,
                updDate: ''
            }
        })
        .then(response => {
            axios({
                method: 'POST',
                url: process.env.MAIN_PAGE_URL_EVICT_CACHE,
                data: {
                    type: 'PRODUCT'
                }
            })
            res.json({
                data: "Insert Succeed",
                status: 200
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                data: "Insert Failed",
                status: 500
            });
        });
}

exports.updateProduct = function (req, res) {

    let subCategory = null;
    if (req.body.subCategoryID != null)
        subCategory = req.body.subCategoryID;

    axios({
            method: 'PUT',
            url: 'https://api-scttshop-v2.herokuapp.com/api/products/' + req.body.productID,
            data: {
                productID: req.body.productID,
                productName: req.body.productName,
                categoryID: req.body.categoryID,
                subCategoryID: subCategory,
                manufacturer: req.body.manufacturer,
                image: req.body.image,
                description: req.body.description,
                importPrice: req.body.importPrice,
                sellPrice: req.body.sellPrice,
                isActive: req.body.isActive,
                quantity: req.body.quantity,
                updDate: ''
            }
        })
        .then(response => {
            axios({
                method: 'POST',
                url: process.env.MAIN_PAGE_URL_EVICT_CACHE,
                data: {
                    type: 'PRODUCT'
                }
            })
            res.json({
                data: "Update Succeed",
                status: 200
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                data: "Update Failed",
                status: 500
            });
        });
}