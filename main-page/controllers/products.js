var category = require('../model/category')
var product = require('../model/product')
var user = require('./user')
var axios = require('axios');

exports.product_list = async function (req, res) {
    const categoryID = req.body.categoryID;
    var listProductReal=new Array();
    const listProduct = await product.getProductOfCategory(categoryID);
    if(req.body.filterName=="Tất cả"&& req.body.filterSub=="Tất cả"){
        res.json({
            info: listProduct
        });
    }
    else{   
        for (let i=0;i < listProduct.length ;i++){
            if(req.body.filterSub=="Tất cả"){
                if(listProduct[i].manufacturer===req.body.filterName)
                listProductReal.push(listProduct[i]);
            }
            else if (req.body.filterName=="Tất cả"){
                if(listProduct[i].subCategoryName===req.body.filterSub)
                listProductReal.push(listProduct[i]);
            }
            else{
                if(listProduct[i].manufacturer===req.body.filterName&&listProduct[i].subCategoryName===req.body.filterSub)
                listProductReal.push(listProduct[i]);
            }
        
        }
        res.json({
            info: listProductReal
        });
        console.log(listProductReal);
    }
    
    
}

// Display list of all products of specific type.
exports.product_list_type = async function (req, res) {
    let listCategories = await category.getListCategory();
    var type = req.query.id;
    let curUser = req.session.user;

    const listProduct = await product.getProductOfCategory(type);
    res.render('product/product', {
        info: listProduct,
        listCategory: listCategories,
        user: curUser,
        length: listProduct.length,
        type: type,
        listType: null,
        listType1:null,
        manufaceturerName: null,
        subCategoryName:null
    });
};

// Display list of all products of specific type (Filter).
exports.product_list_type_filter = async function (req, res) {
    // let unique = [...new Set(listType)];
    // let listTypeReal=Array();
    // listTypeReal=Array.from(unique);
    var body;
    var listType=[];
    var listSub=[];
    let listCategories = await category.getListCategory();
    var type = req.body.type;
    let curUser = req.session.user;
    let valueFilter=req.body.filterName;
    const listProduct = await product.getProductOfCategory(type);
    var listProduct1= new Array();
    var listProductReal=new Array();
    listProduct1=listProduct;
    console.log(req.body.filterSub+req.body.filterName+valueFilter);
    if(valueFilter=="Tất cả" && req.body.filterSub!="Tất cả"){
        for (let i=0;i < listProduct1.length ;i++){
            listType.push(listProduct1[i].manufacturer);
            listSub.push(listProduct1[i].subCategoryName);
                if(listProduct1[i].subCategoryName===req.body.filterSub)
                listProductReal.push(listProduct1[i]);    
        }
    }else if(valueFilter!="Tất cả" && req.body.filterSub=="Tất cả"){
            for (let i=0;i < listProduct1.length ;i++){
                listType.push(listProduct1[i].manufacturer);
                listSub.push(listProduct1[i].subCategoryName);
                if(listProduct1[i].manufacturer===valueFilter)
                listProductReal.push(listProduct1[i]);
            }
        } else if (valueFilter!="Tất cả" && req.body.filterSub!="Tất cả"){
            for (let i=0;i < listProduct1.length ;i++){
                listType.push(listProduct1[i].manufacturer);
                listSub.push(listProduct1[i].subCategoryName);
                if(listProduct1[i].manufacturer===valueFilter&&listProduct1[i].subCategoryName===req.body.filterSub)
                listProductReal.push(listProduct1[i]);
        }
        
                
    }
    var uniq = [...new Set(listType)];
    var uniq1=[...new Set(listSub)];
    // var tmp=listType.push("asd");
    // console.log(JSON.stringify(listType));
    
    if(valueFilter=="Tất cả"&&req.body.filterSub=="Tất cả"){
        res.render('product/product', {
            info: listProduct,
            listCategory: listCategories,
            user: curUser,
            length: listProduct.length,
            type: type,
            listType : null,
            listType1:null,
            manufaceturerName: null,
            subCategoryName:null
        });
    }
    else{
        res.render('product/product', {
        info: listProductReal,
        listCategory: listCategories,
        user: curUser,
        length: listProductReal.length,
        type: type,
        listType : uniq,
        listType1:uniq1,
        manufaceturerName:req.body.filterName,
        subCategoryName:req.body.filterSub
    });
    }
    
    
};

// Display detail page for a specific product.
exports.product_detail = async function (req, res) {
    let listCategories = await category.getListCategory();
    var productId = req.query.id
    const productInfo = await product.getProductDetail(productId)
    let curUser = null
    curUser = user.currentUser()
    res.render('product/product_detail', {
        productInfo: productInfo,
        listCategory: listCategories,
        user: curUser
    })
};


// Handle product update on POST.
exports.product_update_post = async function (req, res) {
    let listCategories = await category.getListCategory();
    res.send('NOT IMPLEMENTED: product update POST');
};

exports.search = function (req, res) {
    const dataSearch = req.body.data;
    //handle search;
    res.send('NOT IMPLEMENTED: product search');
}

exports.product_comment = async function(req,res){
    console.log("sdasdasdsa"+req.body.email+req.body.comment+req.body.customerName);
    if(req.body.email)
    {
    axios({
        method: 'POST',
        url: 'http://api-scttshop-v2.herokuapp.com/api/comments/',
        data: {
            productID: req.body.productID,
            email:req.body.email,
            comment: req.body.comment
        }
    }).then(
        response => {
            res.json({
                data: "Success",
                status: 200
            });
    })
}
else{
    axios({
        method: 'POST',
        url: 'http://api-scttshop-v2.herokuapp.com/api/comments/',
        data: {
            productID: req.body.productID,
            customerName:req.body.customerName,
            comment: req.body.comment
        }
    }).then(
        response => {
            res.json({
                data: "Success",
                status: 200
            });
    })
}
    
}