var axios = require('axios');

module.exports.categoryList = async () => {
    const result = await axios('https://api-scttshop-v2.herokuapp.com/api/categories')
    .then((response) => {
        return response.data;
    });

    return result;
};

module.exports.getCategory = async (categoryID) => {

    const result = await axios.get('https://api-scttshop-v2.herokuapp.com/api/categories/' + categoryID)
        .then((res) => {
           return res.data;
        })

    return result;
}