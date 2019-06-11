var axios = require('axios');
var categoryModel = require('../models/categoryModel');

exports.index = function (req, res) {
    if (req.isAuthenticated()) {
        res.render('category/category', {
            user: req.user
        });
    } else {
        res.redirect('/');
    }

};


exports.getListCategory = async function (req, res) {

    const listCategory = await categoryModel.categoryList();
    res.send(JSON.stringify(listCategory));
}

exports.getCategory = async function (req, res) {

    const categoryID = req.params.categoryID;
    const category = await categoryModel.getCategory(categoryID);

    res.send(JSON.stringify(category));
}


exports.getListProductOfCategory = async function (req, res) {

    const categoryID = req.params.categoryID;
    const category = await categoryModel.getListProductOfCategory(categoryID);

    res.send(JSON.stringify(category));
}

exports.deleteCategory = function (req, res) {
    const categoryID = req.body.categoryID;

    axios.delete("https://api-scttshop-v2.herokuapp.com/api/categories/" + categoryID)
        .then(response => {
            axios({
                method: 'POST',
                url: process.env.MAIN_PAGE_URL_EVICT_CACHE,
                data: {
                    type: 'CATEGORY'
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

exports.insertCategory = function (req, res) {

    axios({
            method: 'POST',
            url: 'https://api-scttshop-v2.herokuapp.com/api/categories/',
            data: {
                categoryName: req.body.categoryName,
                updDate: ''
            }
        })
        .then(response => {
            axios({
                method: 'POST',
                url: process.env.MAIN_PAGE_URL_EVICT_CACHE,
                data: {
                    type: 'CATEGORY'
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

exports.updateCategory = function (req, res) {

    axios({
            method: 'PUT',
            url: 'https://api-scttshop-v2.herokuapp.com/api/categories/' + req.body.categoryID,
            data: {
                categoryName: req.body.categoryName,
                updDate: ''
            }
        })
        .then(response => {
            axios({
                method: 'POST',
                url: process.env.MAIN_PAGE_URL_EVICT_CACHE,
                data: {
                    type: 'CATEGORY'
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