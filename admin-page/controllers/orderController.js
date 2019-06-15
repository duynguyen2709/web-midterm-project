var axios = require('axios');
var orderModel = require('../models/orderModel');

exports.index = function (req, res) {
    if (req.isAuthenticated()) {
        res.render('order/order', {
            user: req.user
        });
    } else {
        res.redirect('/');
    }
};

exports.getListOrder = async function (req, res) {

    const listOrder = await orderModel.orderList();
    res.send(JSON.stringify(listOrder));
}

exports.getOrder = async function (req, res) {

    const orderID = req.params.orderID;
    const order = await orderModel.getOrder(orderID);

    res.send(JSON.stringify(order));
}

exports.updateOrder = function (req, res) {

    axios({
            method: 'PUT',
            url: 'https://api-scttshop-v2.herokuapp.com/api/orders/' + req.body.orderID,
            data: {
                orderID: req.body.orderID,
                status: req.body.status,
                extraInfo: req.body.extraInfo,
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