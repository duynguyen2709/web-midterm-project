var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.get('/', userController.index);

router.get('/get/:username',userController.getUserAccount);

router.get('/get',userController.getListUserAccount);

router.post('/delete',userController.deleteUserAccount);

router.post('/insert',userController.insertUserAccount);

router.post('/update',userController.updateUserAccount);

module.exports = router;