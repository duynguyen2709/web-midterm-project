var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.get('/', userController.index);

//router.get('/notverified',userController.indexNotVerified);

router.get('/get/:username',userController.getUserAccount);

router.post('/get/notverified',userController.getListUserNotVerified);

router.get('/get',userController.getListUserAccount);

router.post('/delete',userController.deleteUserAccount);

router.post('/insert',userController.insertUserAccount);

router.post('/update',userController.updateUserAccount);

router.post('/changepassword',userController.changePassword);

router.post('/lock',userController.lockUserAccount);

router.post('/verify',userController.verifyUserAccount);

module.exports = router;