var axios = require('axios');

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