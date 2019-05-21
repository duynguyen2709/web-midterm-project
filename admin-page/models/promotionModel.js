var axios = require('axios');

module.exports.promotionList = async () => {
    const result = await axios('https://api-scttshop.herokuapp.com/api/promotions')
    .then((response) => {
        return response.data;
    });

    return result;
};

module.exports.getPromotion = async (id) => {

    const result = await axios.get('https://api-scttshop.herokuapp.com/api/promotions/' + id)
        .then((res) => {
           return res.data;
        })

    return result;
}