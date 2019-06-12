var express = require('express');
var router = express.Router();
// Require controller modules.
var categoryController = require('../controllers/categoryController');

router.get('/', categoryController.index);

router.get('/get/:categoryID',categoryController.getCategory);

router.get('/get/:categoryID/products',categoryController.getListProductOfCategory);

router.get('/get',categoryController.getListCategory);

router.post('/delete',categoryController.deleteCategory);

router.post('/insert',categoryController.insertCategory);

router.post('/update',categoryController.updateCategory);

router.post('/sub/delete',categoryController.deleteSubCategory);

router.post('/sub/insert',categoryController.insertSubCategory);

router.post('/sub/update',categoryController.updateSubCategory);

module.exports = router;