var fs = require('fs');
var transporter = require('../utils/MailUtil');
var UserModel = require('../models/userAccountModel');
var bcrypt = require('bcrypt');
var axios = require('axios');

exports.index = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/userdetail');
  } else {
    res.render('index', {
      errorText: ''
    });
  }
}

exports.signupPage = function (req, res) {

  if (req.isAuthenticated()) {
    res.redirect('/userdetail');
  } else {
    res.render('signupPage', {
      user: ''
    });
  }

}

exports.signupSubmit = async function (req, res, next) {

  var schema = new passwordValidator();

  schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces();

  if (!schema.validate(req.body.password)) {
    res.json({
      returncode: -3
    })
    return;
  }

  axios({
    method: 'GET',
    url: 'https://api-scttshop-v2.herokuapp.com/api/useraccounts/checkvalid?username=' + req.body.username + "&email=" + req.body.email
  }).then(validResponse => {

    if (validResponse.data == 1) {
      axios({
          method: 'POST',
          url: 'https://api-scttshop-v2.herokuapp.com/api/useraccounts/',
          data: {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
            fullName: req.body.fullName,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            birthDate: req.body.birthDate,
            avatar: 'https://i.stack.imgur.com/l60Hf.png',
            role: 'USER',
            updDate: ''
          }
        })
        .then(response => {
          res.json({
            returncode: 1
          })
        })
        .catch(err => {
          console.log(err);

          res.json({
            returncode: 0
          })
        });
    } else {
      res.json({
        returncode: validResponse.data
      })
    }

  })

}

exports.forgotPass = async function (req, res) {

  const user = await UserModel.getUser(req.body.username);

  if (user == null || user.username == null) {
    res.json({
      returncode: -2
    });

    return;
  }

  if (user.email != req.body.email) {
    res.json({
      returncode: -1
    });

    return;
  }

  axios({
      method: 'PUT',
      url: 'https://api-scttshop-v2.herokuapp.com/api/useraccounts/' + req.body.username,
      data: {
        username: req.body.username,
        password: bcrypt.hashSync('Aa123456', bcrypt.genSaltSync(8), null),
        email: req.body.email,
        avatar: user.avatar,
        birthDate: user.birthDate,
        fullName: user.fullName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        role: user.role,
        updDate: ''
      }
    })
    .then(function (response) {

    })
    .catch(err => {
      console.log(err);

    });


  let mailContent = '';

  fs.readFile(__dirname + '/resetPass.html', function (err, data) {
    if (err) {
      console.log(err);
      res.json({
        returncode: 0
      });

      return;
    }
    mailContent = data.toString();
    mailContent = mailContent.replace("{{USERNAME}}", req.body.username);

    var mail = {
      from: 'scttshopv2@gmail.com', // Địa chỉ email của người gửi
      to: req.body.email, // Địa chỉ email của người gửi
      subject: '[SCTTSHOP] Reset mật khẩu', // Tiêu đề mail
      html: mailContent // Nội dung mail dạng text
    };
    //Tiến hành gửi email
    transporter.sendMail(mail, function (error, info) {
      if (error) { // nếu có lỗi
        console.log(error);
        res.json({
          returncode: 0
        });
      } else { //nếu thành công
        console.log('Email sent: ' + info.response);

        res.json({
          returncode: 1
        });
      }
    });


  });

}