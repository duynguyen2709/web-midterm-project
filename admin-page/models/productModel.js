var axios = require('axios');

module.exports.productList = async () => {
    const result = await axios('https://api-scttshop-v2.herokuapp.com/api/products')
    .then((response) => {
        return response.data;
    });

    return result;
};

module.exports.getProduct = async (id) => {

    const result = await axios.get('https://api-scttshop-v2.herokuapp.com/api/products/' + id)
        .then((res) => {
           return res.data;
        })

    return result;
}