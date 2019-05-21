var axios = require('axios');

module.exports.userAccountList = async () => {
    const result = await axios.get('https://api-scttshop.herokuapp.com/api/useraccounts', {
            timeout: 10000
        })
        .then((response) => {
            return response.data;
        });

    return result;
};

module.exports.getUser = async (username) => {

    const result = await axios.get('https://api-scttshop.herokuapp.com/api/useraccounts/' + username)
        .then((res) => {
           return res.data;
        })

    return result;
}