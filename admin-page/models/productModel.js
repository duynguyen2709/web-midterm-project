var axios = require('axios');

module.exports.productList = async () => {
    const result = await axios('http://localhost:8080/api/products')
    .then((response) => {
        return response.data;
    });

    return result;
};

module.exports.getProduct = async (id) => {

    const result = await axios.get('http://localhost:8080/api/products/' + id)
        .then((res) => {
           return res.data;
        })

    return result;
}