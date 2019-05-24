var axios = require('axios');
var user=require('../models/userAccountModel');

exports.index = function(req, res) {
    res.render('user/user');
};

exports.getListUserAccount = async function(req,res){

    const listUserAccount = await user.userAccountList();
    res.send(JSON.stringify(listUserAccount));
}

exports.getUserAccount = async function(req,res){

    const username = req.params.username;
    const userAccount = await user.getUser(username);

    res.send(JSON.stringify(userAccount));
}

exports.deleteUserAccount = function(req,res){
    const username = req.body.username;

    axios.delete("https://api-scttshop-v2.herokuapp.com/api/useraccounts/" + username)
    .then(response => {
        res.json({data : "Delete Succeed", status : 200});
    })
    .catch(err => {
        console.log(err);
        res.json({data:"Delete Failed",status:500});
    });
}

exports.insertUserAccount = function(req,res){
    
    axios({
        method: 'POST',
        url: 'https://api-scttshop-v2.herokuapp.com/api/useraccounts/',
        data: {
          username: req.body.username,
          password: '123456',
          fullName: req.body.fullName,
          address: req.body.address,
          phoneNumber:req.body.phoneNumber,
          role:req.body.role,
          updDate:''
        }
      })
    .then(response => {
        res.json({data : "Insert Succeed", status : 200});
    })
    .catch(err => {
        console.log(err);
        res.json({data:"Insert Failed",status:500});
    });
}

exports.updateUserAccount = function(req,res){
    
    axios({
        method: 'PUT',
        url: 'https://api-scttshop-v2.herokuapp.com/api/useraccounts/' + req.body.username,
        data: {
          username: req.body.username,
          password: '123456',
          fullName: req.body.fullName,
          address: req.body.address,
          phoneNumber:req.body.phoneNumber,
          role:req.body.role,
          updDate:''
        }
      })
    .then(response => {
        res.json({data : "Update Succeed", status : 200});
    })
    .catch(err => {
        console.log(err);
        res.json({data:"Update Failed",status:500});
    });
}
