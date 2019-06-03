var axios = require('axios');
var firebase = require('firebase-admin');
var moment = require('moment-timezone');

module.exports.customerList = async () => {

    let listUserFirebase = [];

    await firebase.auth().listUsers(1000, '1')
        .then(function (listUsersResult) {
            listUsersResult.users.forEach(function (userRecord) {
                listUserFirebase.push(userRecord.toJSON());
            });

        })
        .catch(function (error) {
            console.log('Error listing users firebase:', error);
            return null;
        });

    const result = await axios.get('https://api-scttshop-v2.herokuapp.com/api/customers')
        .then((response) => {
            const listCustomer = response.data;
            listCustomer.forEach(e => {
                try {
                    const customer = listUserFirebase.find(c => c.email == e.email);

                    if (customer != null) {
                        e.uid = customer.uid;
                        e.lastSignInTime = moment(customer.metadata.lastSignInTime).tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD HH:mm:ss");                     
                    } else {
                        e.uid = "";
                        e.lastSignInTime = "";
                    }

                    //console.log(e);

                } catch (e) {}
            });

            return listCustomer;
        }).catch((err) => {
            console.log("Error userAccountList : " + err.response);
            return null;
        });

    return result;
};

module.exports.getCustomer = async (email) => {

    try {
        const result = await axios.get('https://api-scttshop-v2.herokuapp.com/api/customers/' + email)
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