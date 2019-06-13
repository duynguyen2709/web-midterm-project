var category = require('../model/category')
var product = require('../model/product')
var user = require('./user')
var Cart = require('../model/cart').Cart
// Display list of all products of specific type.
exports.get_detail = async function (req, res) {
    let listCategories = await category.getListCategory();
    let curUser = req.session.user
    res.send('NOT IMPLEMENTED: my cart get detail', {
        listCategory: listCategories,
        user: curUser
    });
};

exports.get_page = async function (req, res) {
    let listCategories = await category.getListCategory();
    let curUser = req.session.user
    let listCount = new Array();
    let listProductCart;
    if (req.session.cart) {
        for (let i = 0; i < req.session.cart.array.length; i++) {
            let productDetail = await product.getProductDetail(req.session.cart.array[i].productID);
            listCount.push(productDetail['quantity']);
            if (req.session.cart.array[i].count > listCount[i]) {
                req.session.cart.array[i].count = listCount[i];
            }
        }
        listProductCart = req.session.cart.array;
        res.render('mycart/my_cart.ejs', {
            listCategory: listCategories,
            user: curUser,
            list: listProductCart,
            listCount: listCount
        });
    } else {
        res.render('mycart/my_cart.ejs', {
            listCategory: listCategories,
            user: curUser,
            list: null,
            listCount: null
        });
    }
};
// Display detail page for a specific product.
exports.apply_coupon = async function (req, res) {
    let listCategories = await category.getListCategory();
    res.send('NOT IMPLEMENTED: apply coupon');
};

exports.update = async function (req, res) {
    let listCategories = await category.getListCategory();
    s.send('NOT IMPLEMENTED: update');
};
exports.addProduct = async function (req, res) {
    var cart = await new Cart(req.session.cart ? req.session.cart : {});
    cart.add(req.body.productID, req.body.categoryID, req.body.image, req.body.name, req.body.price, req.body.size);
    req.session.cart = await cart;
    res.json({
        returncode: 1
    });

};
exports.removeProduct = async function (req, res) {
    var cart = await new Cart(req.session.cart ? req.session.cart : {});
    let listCount = new Array();
    cart.remove(req.body.image, req.body.name, req.body.price);
    for (let i = 0; i < cart.array.length; i++) {
        let productDetail = await product.getProductDetail(cart.array[i].productID);
        listCount.push(productDetail['quantity']);
        if (cart.array[i].count > listCount[i]) {
            cart.array[i].count = listCount[i];
        }
    }

    req.session.cart = await cart;
    res.json({
        cart: req.session.cart.array,
        listCount: listCount
    });


};
exports.updateCount = async function (req, res) {
    var cart = await new Cart(req.session.cart ? req.session.cart : {});
    let listCount = new Array();
    cart.update(req.body.image, req.body.name, req.body.price, req.body.count, req.body.size);
    for (let i = 0; i < cart.array.length; i++) {
        let productDetail = await product.getProductDetail(cart.array[i].productID);
        listCount.push(productDetail['quantity']);
        if (cart.array[i].count > listCount[i]) {
            cart.array[i].count = listCount[i];
        }
    }
    req.session.cart = await cart;
    res.json({
        cart: req.session.cart.array,
        listCount: listCount
    });


};
exports.deleteCart = async function (req, res) {
    let listCategories = await category.getListCategory();
    req.session.cart.array = [];
    let curUser = req.session.user;
    res.render('./checkout/checkout', {
        listCategory: listCategories,
        user: curUser,
        list: [],
        listInDb: []
    });
}


exports.proceed_to_checkout = async function (req, res) {
    let listCategories = await category.getListCategory();
    let curUser = req.session.user
    res.render('/check-out/checkout.ejs', {
        listCategory: listCategories,
        user: curUser
    });
};