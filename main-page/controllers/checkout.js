var category = require('../model/category')
var user = require('./user')
var CartInDb = require('../model/cart').CartInDb
var axios = require('axios');
// Display list of all products of specific type.
exports.get_detail = async function (req, res) {
    let listCategories = await category.getListCategory();
    let curUser = req.session.user
    let list;
    if (req.session.cart) {
        list = req.session.cart.array;
        var listInDb = new CartInDb(list);
        res.render('checkout/checkout', {
            listCategory: listCategories,
            user: curUser,
            list: list,
            listInDb: listInDb.array
        });
    } else {
        res.render('checkout/checkout', {
            listCategory: listCategories,
            user: curUser,
            list: null
        });
    }


};

// Display detail page for a specific product.
exports.submit_checkout_post = async function (req, res) {
    let listCategories = await category.getListCategory();
    let curUser = req.session.user
    res.send('NOT IMPLEMENTED: submit checkout POST');
};

exports.postOrder = async function (req, res) {
    
    const order = {
        email: req.session.user.email,
        shippingAddress: req.body.shippingAddress,
        orderDetail:  req.body.orderDetail
    };
    console.log(order);

    axios({
            method: 'POST',
            url: 'http://api-scttshop-v2.herokuapp.com/api/orders/',
            data: order
        })
        .then(
            response => {
                res.json({
                    data: "Insert Succeed",
                    status: 200
                });
            })
        .catch(err => {
            console.log(err)
            res.json({
                data: "Error",
                status: 500
            });
        })


};