var promotion = require('../models/promotionModel');
var productModel = require('../models/productModel');
var axios = require('axios');

var listProduct = null;

exports.index = async function (req, res) {

    if (req.isAuthenticated()) {
        listProduct = await productModel.productList();
        res.render('promotion/promotion', {
            listProduct: listProduct,
            user: req.user
        });
    } else {
        res.redirect('/');
    }



};

exports.getListPromotion = async function (req, res) {

    const listpromotion = await promotion.promotionList();
    res.send(JSON.stringify(listpromotion));

}

exports.getPromotion = async function (req, res) {

    const promotionID = req.params.promotionID;
    const response = await promotion.getPromotion(promotionID);

    res.send(JSON.stringify(response));
}

exports.deletePromotion = function (req, res) {
    const promotionID = req.body.promotionID;

    axios.delete("https://api-scttshop-v2.herokuapp.com/api/promotions/" + promotionID)
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

exports.insertPromotion = function (req, res) {

    axios({
            method: 'POST',
            url: 'https://api-scttshop-v2.herokuapp.com/api/promotions/',
            data: {
                type: 'PRODUCT',
                appliedID: req.body.appliedID,
                promotionDiscount: req.body.promotionDiscount,
                promotionName: req.body.promotionName,
                isActive: req.body.isActive,
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

exports.updatePromotion = function (req, res) {

    axios({
            method: 'PUT',
            url: 'https://api-scttshop-v2.herokuapp.com/api/promotions/' + req.body.promotionID,
            data: {
                promotionID: req.body.promotionID,
                type: 'PRODUCT',
                appliedID: req.body.appliedID,
                promotionDiscount: req.body.promotionDiscount,
                promotionName: req.body.promotionName,
                isActive: req.body.isActive,
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