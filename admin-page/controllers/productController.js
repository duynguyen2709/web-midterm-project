var productModel = require('../models/productModel');
var axios = require('axios');
var categoryModel = require('../models/categoryModel');

var listCategory = null;

exports.index = async function (req, res) {

    listCategory = await categoryModel.categoryList();
    res.render('product/product', {
        title: 'Admin Page',
        listCategory:listCategory
    });
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

    axios.delete("http://localhost:8080/api/products/" + productID)
        .then(response => {
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

    console.log("categoryID:" + req.body.categoryID);

    axios({
            method: 'POST',
            url: 'http://localhost:8080/api/products/',
            data: {
                productName: req.body.productName,
                categoryID: req.body.categoryID,
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

    axios({
            method: 'PUT',
            url: 'http://localhost:8080/api/products/' + req.body.productID,
            data: {
                productID:req.body.productID,
                productName: req.body.productName,
                categoryID: req.body.categoryID,
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