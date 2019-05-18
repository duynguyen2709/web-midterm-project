var express = require('express');
var router = express.Router();
// Require controller modules.
var categoryController = require('../controllers/categoryController');

router.get('/', categoryController.index);

// GET request for creating category. NOTE This must come before route for id (i.e. display category).
router.post('/category/create', categoryController.category_create);

// DELETE request to delete category.
router.delete('/category/:id/delete', categoryController.category_delete);

// PUT request to update category.
router.put('/category/:id/update', categoryController.category_update);

// GET request for one category.
router.get('/category/:id', categoryController.category_detail);

// GET request for list of all category.
router.get('/category', categoryController.category_list);

module.exports = router;