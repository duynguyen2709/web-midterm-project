var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/userdetail');
  } else {
    res.render('index', {
      errorText: ''
    });

  }
});

router.get('/signup',function(req,res,next){
  res.render('signupPage');
})


module.exports = router;