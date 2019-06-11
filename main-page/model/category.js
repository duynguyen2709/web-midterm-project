var CATEGORY_CACHE = [];

exports.getName = function () {
    return categoryName + categorySubType;
}
exports.getLinkProduct = function () {
    return "/products/type?id=" + categoryID;
}
exports.getListCategory = async () => {
    if (CATEGORY_CACHE == null || CATEGORY_CACHE.length == 0) {

        const res = await fetch('https://api-scttshop-v2.herokuapp.com/api/categories');
        let data = await res.json();
        data.forEach(element => {
            CATEGORY_CACHE.push({
                name: element.categoryName,
                Id: element.categoryID
            });
        });
    }

    return CATEGORY_CACHE;
}

exports.evictCache = async function(){
    CATEGORY_CACHE = [];

}