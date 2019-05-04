var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/homepage', { title: 'Daily Shop' });
});

/*GET my account page.*/
router.get('/detailUser',user_controller.view_detail);

router.get('/createUser', user_controller.user_create_get);

// POST request for creating Book.
router.post('/createUser', user_controller.user_create_get);

// GET request to update Book.
router.get('/detailUser?userId=:id/update', user_controller.user_update_get);

// POST request to update Book.
router.post('/detailUser?userId=:id/update', user_controller.user_update_post);

module.exports = router;
