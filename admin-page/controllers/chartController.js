exports.index = function(req, res) {
    res.render('chart/chart',{user:req.user});
};