var axios = require('axios');

module.exports.userAccountList = async () => {
    const result = await axios.get('http://localhost:8080/api/useraccounts', {
            timeout: 10000
        })
        .then((response) => {
            return response.data;
        });

    return result;
};

module.exports.getUser = async (username) => {

    console.log(username);
    const result = await axios.get('http://localhost:8080/api/useraccounts/' + username)
        .then((res) => {
           return res.data;
        })

    return result;
}