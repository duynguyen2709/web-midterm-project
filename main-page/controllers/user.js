var category=require('../model/category')
var firebase=require('firebase')
var axios = require('axios');

exports.currentUser= function(){
    const user= firebase.auth().currentUser
    return user

}
exports.view_detail = async function(req, res) {
    let listCategories=await category.getListCategory();   
    let curUser=null
    curUser= firebase.auth().currentUser
    let data= await fetch("https://api-scttshop-v2.herokuapp.com/api/customers/"+curUser.email)
    let user= await data.json()
    curUser={
        email: user.email,
        displayName: user.fullName,
        avatar: user.avatar,
        address: user.address,
        phoneNumber: user.phoneNumber,
        verified: user.verified
    }
    res.render('user/account_detail',{listCategory: listCategories, user: curUser});
}

exports.user_create_get = async function(req, res) {
    let listCategories=await category.getListCategory(); 
    let user=null
    user = await firebase.auth().currentUser
    res.render('user/register_account',{listCategory: listCategories, user: user  ,code: "0"});
};

exports.user_logout_post = async function(req, res) {
    let listCategories=await category.getListCategory();   
    firebase.auth().signOut().then(()=>{
        res.redirect("/")
    })

}


exports.user_login_post = async function(req, res) {
    let listCategories=await category.getListCategory();   
    let user=[]
    let email = req.body.username;
    let password = req.body.password;  
    user = await firebase.auth().currentUser
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        // ...
      });
    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            console.log(user.emailVerified)
            if(user.emailVerified)
            {
                await axios({
                method: 'PUT',
                url: 'https://api-scttshop-v2.herokuapp.com/api/customers/'+user.email+"/verify",
                })
                .catch(err => {
                    console.log(err)
                })
            }
            let code="1"
            res.redirect("/")
           
        } else {

            console.log("no user")
          // No user is signed in.
        }
      });
};

exports.user_create_post = async function(req, res) {
    const auth = firebase.auth();
    var email = req.body.username;
    var password = req.body.password;
    let user=null
    let listCategories=await category.getListCategory();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        let code= "-1"
        res.render('user/register_account',{listCategory: listCategories,user: null , code: code });
        // ...
    });
    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            user.updateProfile({
                displayName: req.body.displayName
            })
            var currentUser={
                uid: user.uid,
                email: user.email,
                username: req.body.displayName,
                verified: user.emailVerified
            }
            await axios({
                method: 'POST',
                url: 'https://api-scttshop-v2.herokuapp.com/api/customers',
                data: {
                  email: user.email,
                  fullName: req.body.displayName,
                  avatar: "",
                  address: req.body.address,
                  phoneNumber:req.body.phone,
                  totalBuy: 0,
                  verified: user.emailVerified
                }
            })
            .catch(err => {
                console.log(err)
                //res.render('user/my_account',{listCategory: listCategories, user: currentUser ,code: "-1"});
            })
            let code="1"
            user.sendEmailVerification().then(function() {
                user.signOut().then(()=>{res.redirect('/')})
                //res.render('user/register_account',{listCategory: listCategories, user: currentUser ,code: code});
            })
            .catch(err=>{
                res.redirect('/')
                //res.render('user/register_account',{listCategory: listCategories, user: currentUser ,code: "-1"});
            })
           
        } else {
          // No user is signed in.
        }
      });


};

// Display book update form on GET.
exports.user_update_get = async function(req, res) {
    let listCategories=await category.getListCategory();   
    res.render('user/account_detail',{listCategory: listCategories});
};
// Handle book update on POST.
exports.user_update_post = async function(req, res) {
    let listCategories=await category.getListCategory();   
    res.render('user/account_detail',{listCategory: listCategories});
};
