var axios = require('axios');

module.exports.promotionList = async () => {
    const result = await axios('https://api-scttshop.herokuapp.com/api/promotions')
    .then((response) => {
        return response.data;
    });

    return result;
};