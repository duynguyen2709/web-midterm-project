var express = require('express');
var router = express.Router();
// Require controller modules.
var boothController = require('../controllers/boothController');

router.get('/', boothController.index);

// GET request for creating booth. NOTE This must come before route for id (i.e. display booth).
router.post('/booths/create', boothController.booth_create);

// DELETE request to delete booth.
router.delete('/booths/:id/delete', boothController.booth_delete);

// PUT request to update booth.
router.put('/booths/:id/update', boothController.booth_update);

// GET request for one booth.
router.get('/booths/:id', boothController.booth_detail);

// GET request for list of all booths.
router.get('/booths', boothController.booth_list);

module.exports = router;