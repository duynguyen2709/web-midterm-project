var axios = require('axios');
let result = [];
const res = async () => {
    const result = await axios('https://api-scttshop.herokuapp.com/api/categories')
    .then((response) => {
        return response.data;
    });

    console.log(result);
    return result;
};

var response = res();