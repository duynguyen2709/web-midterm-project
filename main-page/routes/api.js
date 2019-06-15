var productModel = require('../model/product');
var categoryModel = require('../model/category');

var express = require('express');
var router = express.Router();

router.post('/evict',function(req,res){
    const type = req.body.type;

    if (type == "PRODUCT"){
        productModel.evictCache();

        res.json({
            returncode:1
        })

        return;
    }

    else if (type == "CATEGORY"){
        categoryModel.evictCache();

        res.json({
            returncode:1
        })

        return;
    }

    res.json({
        returncode:0
    })
});

module.exports = router;