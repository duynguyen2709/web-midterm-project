var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user.js');
var request = require('request')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/homepage', { title: 'Daily Shop' });
});

/*GET my account page.*/
router.get('/detailUser',user_controller.view_detail);

router.get('/createUser', user_controller.user_create_get);

router.post('/getUserStatus',user_controller.get_user_status);

// POST request for creating Book.
router.post('/createUser', user_controller.user_create_post);

router.post('/login', user_controller.user_login_post);
router.post('/logout', user_controller.user_logout_post);

// GET request to update Book.
router.get('/update', user_controller.user_update_get);
router.get('/updatePassword', user_controller.user_update_password_get);
router.post('/updatePassword', user_controller.user_update_password_post);

// POST request to update Book.
router.post('/update', user_controller.user_update_post);
router.post('/reset', user_controller.user_reset_post);
router.post('/check', user_controller.user_check_post);

module.exports = router;
