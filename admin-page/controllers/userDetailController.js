var axios = require('axios');
var UserModel = require('../models/userAccountModel');

exports.index = function (req, res) {

    if (req.isAuthenticated()) {
        res.render('user/userDetail', {
            user: req.user
        });
    } else {
        res.render('index', {
            errorText: ''
        });
    }
};

exports.reload = async function (req, res) {

    if (req.isAuthenticated()) {
        const newUser = await UserModel.getUser(req.user.username);

        req.logout();

        req.login(newUser, function (err) {
            if (err) return next(err)

            res.redirect("/userdetail");
        })


    } else {
        res.render('index', {
            errorText: ''
        });
    }
}