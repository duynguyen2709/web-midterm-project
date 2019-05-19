var axios = require('axios');

module.exports.categoryList = async () => {
    const result = await axios('https://api-scttshop.herokuapp.com/api/categories')
    .then((response) => {
        return response.data;
    });

    return result;
};