var axios = require('axios');
var bcrypt = require('bcrypt');

module.exports.userAccountList = async (notVerifiedStatus) => {
    const result = await axios.get('https://api-scttshop-v2.herokuapp.com/api/useraccounts?notVerified=' + notVerifiedStatus)
        .then((response) => {
            return response.data;
        }).catch((err) => {
            console.log("Error userAccountList : " + err.response);
            return null;
        });

    return result;
};

module.exports.getUser = async (username) => {

    try {
        const result = await axios.get('https://api-scttshop-v2.herokuapp.com/api/useraccounts/' + username)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.log("Error getUser : " + err.response);
                return null;
            });

        return result;
    } catch (err) {
        return null;
    }
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}