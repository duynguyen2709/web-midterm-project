var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user.js');
var request = require('request')


router.get('/', function(req, res, next) {
  res.render('home/homepage', { title: 'Daily Shop' });
});


router.get('/detailUser',user_controller.view_detail);

router.get('/createUser', user_controller.user_create_get);

router.post('/getUserStatus',user_controller.get_user_status);


router.post('/createUser', user_controller.user_create_post);

router.post('/login', user_controller.user_login_post);
router.post('/logout', user_controller.user_logout_post);

router.get('/update', user_controller.user_update_get);
router.get('/updatePassword', user_controller.user_update_password_get);
router.post('/updatePassword', user_controller.user_update_password_post);

router.post('/update', user_controller.user_update_post);
router.post('/reset', user_controller.user_reset_post);
router.post('/check', user_controller.user_check_post);

module.exports = router;
