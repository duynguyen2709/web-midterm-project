var axios = require('axios');

module.exports.orderList = async () => {
    const result = await axios('https://api-scttshop-v2.herokuapp.com/api/orders')
    .then((response) => {
        return response.data;
    });

    return result;
};

module.exports.getOrder = async (orderID) => {

    const result = await axios.get('https://api-scttshop-v2.herokuapp.com/api/orders/' + orderID)
        .then((res) => {
           return res.data;
        })

    return result;
}