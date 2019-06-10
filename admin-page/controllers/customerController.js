var axios = require('axios');
var customerModel = require('../models/customerModel');
var firebase = require('firebase-admin');

exports.index = function (req, res) {
    if (req.isAuthenticated()) {
        res.render('customer/customer', {
            user: req.user
        });
    } else {
        res.redirect('/');
    }

};

exports.getListCustomer = async function (req, res) {

    const listCustomer = await customerModel.customerList();
    res.send(JSON.stringify(listCustomer));
}

exports.getCustomer = async function (req, res) {

    const email = req.params.email;
    const customer = await customerModel.getCustomer(email);

    res.send(JSON.stringify(customer));
}

exports.deleteCustomer = function (req, res) {
    const email = req.body.email;

    axios.delete("https://api-scttshop-v2.herokuapp.com/api/customers/" + email)
        .then(response => {

            firebase.auth().deleteUser(req.body.uid)
            .then(function() {
                console.log('Delete User Firebase Succeed');           
            })
            .catch(function(error) {
                console.log('Error deleting user firebase:' + error);
            });

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

exports.updateCustomer = function (req, res) {

    axios({
            method: 'PUT',
            url: 'https://api-scttshop-v2.herokuapp.com/api/customers/' + req.body.email + "/lock/" + req.body.status
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