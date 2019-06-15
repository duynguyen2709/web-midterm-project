var express = require('express');
var router = express.Router();
var loginController = require('../controllers/loginController');

/* GET home page. */
router.get('/', loginController.index);

router.get('/signup', loginController.signupPage);

router.post('/signup', loginController.signupSubmit);

router.post('/forgotpass',loginController.forgotPass);

module.exports = router;