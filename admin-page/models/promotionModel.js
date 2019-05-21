var axios = require('axios');

module.exports.promotionList = async () => {
    const result = await axios('http://localhost:8080/api/promotions')
    .then((response) => {
        return response.data;
    });

    return result;
};

module.exports.getPromotion = async (id) => {

    const result = await axios.get('http://localhost:8080/api/promotions/' + id)
        .then((res) => {
           return res.data;
        })

    return result;
}