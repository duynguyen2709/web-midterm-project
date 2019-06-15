var nodemailer = require('nodemailer');


const option = {
    service: 'gmail',
    auth: {
        user: 'scttshopv2@gmail.com', // email hoặc username
        pass: 'Icedestyn123' // password
    }
};
var transporter = nodemailer.createTransport(option);

module.exports = transporter;