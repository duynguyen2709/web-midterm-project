var PRODUCT_OF_CATEGORIES_CACHE = new Map([]);

exports.getPromoProduct = async () => {
    let result = [];
    const res = await fetch('http://api-scttshop-v2.herokuapp.com/api/promotions/products');
    let data = await res.json();
    data.forEach(element => {
        result.push(element);
    });
    this.promoProduct = result;
    //console.log(promoProduct)
}
exports.getProductDetail = async (ID) => {
    var url = 'https://api-scttshop-v2.herokuapp.com/api/products/' + ID
    const res = await fetch(url);
    let data = await res.json();
    return data

}

exports.getProductOfCategory = async (categoryID) => {
    
    if (PRODUCT_OF_CATEGORIES_CACHE.get(categoryID) == null ||
        !PRODUCT_OF_CATEGORIES_CACHE.has(categoryID)) {
            //not in cache
            //then get from api
        const res = await fetch('https://api-scttshop-v2.herokuapp.com/api/categories/' + categoryID + '/products');
        let data = await res.json();

        PRODUCT_OF_CATEGORIES_CACHE.set(categoryID, data);
    }
    return PRODUCT_OF_CATEGORIES_CACHE.get(categoryID);
}