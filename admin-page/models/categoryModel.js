var axios = require('axios');

module.exports.categoryList = async () => {
    const result = await axios('http://localhost:8080/api/categories')
    .then((response) => {
        return response.data;
    });

    return result;
};

module.exports.getCategory = async (categoryID) => {

    const result = await axios.get('http://localhost:8080/api/categories/' + categoryID)
        .then((res) => {
           return res.data;
        })

    return result;
}