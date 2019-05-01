var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.get('/', userController.index);

//POST request for creating user.
router.post('/users/create', userController.user_create);

// DELETE request to delete user.
router.delete('/users/:id/delete', userController.user_delete);

// PUT request to update user.
router.put('/users/:id/update', userController.user_update);

// GET request for one user.
router.get('/users/:id', userController.user_detail);

// GET request for list of all user.
router.get('/users', userController.user_list);

module.exports = router;