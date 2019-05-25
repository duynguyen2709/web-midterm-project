var axios = require('axios');
var user = require('../models/userAccountModel');
var bcrypt = require('bcrypt');

exports.index = function (req, res) {
    if (req.isAuthenticated()) {
        res.render('user/user', {
            user: req.user
        });
    } else {
        res.redirect('/');
    }

};

exports.getListUserAccount = async function (req, res) {

    const listUserAccount = await user.userAccountList();
    res.send(JSON.stringify(listUserAccount));
}

exports.getUserAccount = async function (req, res) {

    const username = req.params.username;
    const userAccount = await user.getUser(username);

    res.send(JSON.stringify(userAccount));
}

exports.deleteUserAccount = function (req, res) {
    const username = req.body.username;

    axios.delete("https://api-scttshop-v2.herokuapp.com/api/useraccounts/" + username)
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

exports.insertUserAccount = function (req, res) {

    axios({
            method: 'POST',
            url: 'https://api-scttshop-v2.herokuapp.com/api/useraccounts/',
            data: {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
                fullName: req.body.fullName,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                birthDate: req.body.birthDate,
                avatar: 'https://i.stack.imgur.com/l60Hf.png',
                role: 'ADMIN',
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

exports.changePassword = function (req, res) {

    axios({
            method: 'PUT',
            url: 'https://api-scttshop-v2.herokuapp.com/api/useraccounts/' + req.body.username,
            data: {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
                email: req.body.email,
                avatar: req.body.avatar,
                birthDate: req.body.birthDate,
                fullName: req.body.fullName,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                role: req.body.role,
                updDate: ''
            }
        })
        .then(async function (response) {
            const newUser = await user.getUser(req.body.username);

            req.logout();

            req.login(newUser, function (err) {
                if (err) return next(err)

                res.json({
                    data: "Update Succeed",
                    status: 200
                });
            })

        })
        .catch(err => {
            console.log(err);
            res.json({
                data: "Update Failed",
                status: 500
            });
        });
}

exports.updateUserAccount = function (req, res) {

    axios({
            method: 'PUT',
            url: 'https://api-scttshop-v2.herokuapp.com/api/useraccounts/' + req.body.username,
            data: {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                avatar: req.body.avatar,
                birthDate: req.body.birthDate,
                fullName: req.body.fullName,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                role: req.body.role,
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