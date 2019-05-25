var express = require('express');
var router = express.Router();
var axios = require('axios');
var bcrypt = require('bcrypt');

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

router.get('/signup', function (req, res, next) {

  if (req.isAuthenticated()) {
    res.redirect('/userdetail');
  } else {
    res.render('signupPage');
  }

});

router.post('/signup', async function (req, res, next) {
  
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
        role: 'ADMIN',
        updDate: ''
      }
    })
    .then(response => {
      res.json({
        returncode: 1
      })
    })
    .catch(err => {
      console.log(err);

      res.json({
        returncode: 0
      })
    });
});


module.exports = router;