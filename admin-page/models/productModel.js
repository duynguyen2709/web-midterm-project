var axios = require('axios');

module.exports.productList = async () => {
    const result = await axios('https://api-scttshop.herokuapp.com/api/products')
    .then((response) => {
        return response.data;
    });

    return result;
};