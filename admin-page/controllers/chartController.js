exports.index = function (req, res) {
    if (req.isAuthenticated()) {
        res.render('chart/chart', {
            user: req.user
        });
    } else {
        res.redirect('/');
    }

};