var category=require('../model/category')
var product=require('../model/product')
var firebase=require('firebase')
var axios = require('axios');

exports.currentUser= function(){
    const user= firebase.auth().currentUser
    return user

}
exports.view_detail = async function(req, res) {
    let listCategories=await category.getListCategory();   
    let  curUser =req.session.user
    let data= await fetch("https://api-scttshop-v2.herokuapp.com/api/customers/"+curUser.email)
    let user= await data.json()
   console.log(user)
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
    res.render('user/register_account',{listCategory: listCategories, user: user  ,code: "0"});
};

exports.user_logout_post =  function(req, res) {
    req.session.destroy()
    firebase.auth().signOut().then(()=>{
        res.redirect('/')
       
    }).catch((err)=>{
        console.log(err)
    })
   

}


exports.user_login_post =  function(req, res) {
    let user=[]
    let email = req.body.username;
    let password = req.body.password;  
    //user = await firebase.auth().currentUser
    /*await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    });*/
  
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        // ...
      }).then(()=>{
          let user=firebase.auth().currentUser
          //console.log(firebase.auth().currentUser)
          req.session.isLogged = true;
          req.session.user = user
          if(user.emailVerified==true)
          {
            axios({
                method: 'PUT',
                url: 'https://api-scttshop-v2.herokuapp.com/api/customers/'+user.email+"/verify",
            }).catch(err => {
                console.log(err)
            })
                  
        }
          res.redirect('/')
        /*firebase.auth().onAuthStateChanged( function(user) {
            if (user) {
                req.session.isLogged = true;
                req.session.user = user
                if(user.emailVerified==true)
                {
                   
                  
                }
                
                res.redirect('/')
               
            } else {
                console.log("no user")
            }
          })*/

      })
   
};

exports.user_create_post = async function(req, res) {
    let listCategories=await category.getListCategory(); 
    const auth = firebase.auth();
    var email = req.body.username;
    var password = req.body.password;
    let user=null
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        let code= "-1"
        console.log(errorCode)
        res.render('user/register_account',{listCategory: listCategories,user: null , code: errorMessage });
        // ...
    }).then ( ()=>{

        let user=firebase.auth().currentUser
        if(user!=null)
        {
            user.updateProfile({
            displayName: req.body.displayName
        })
        var currentUser={
            uid: user.uid,
            email: user.email,
            username: req.body.displayName,
            verified: user.emailVerified
        }
        axios({
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
            
            firebase.auth().currentUser.signOut()
            req.session.destroy(function() {
                console.log("Logged Out!");
              });
            res.redirect('/')
            //res.render('user/register_account',{listCategory: listCategories, user: currentUser ,code: code});
        })
        .catch(err=>{
            res.redirect('/')
            //res.render('user/register_account',{listCategory: listCategories, user: currentUser ,code: "-1"});
        })
    }
       
    })


};

// Display book update form on GET.
exports.user_update_get = async function(req, res) {
    let listCategories=await category.getListCategory(); 
    let user=null
    user = await firebase.auth().currentUser
    let data= await fetch("https://api-scttshop-v2.herokuapp.com/api/customers/"+user.email)
    user= await data.json()
    curUser={
        email: user.email,
        displayName: user.fullName,
        avatar: user.avatar,
        address: user.address,
        phoneNumber: user.phoneNumber,
        verified: user.verified
    }
    res.render('user/update_account',{listCategory: listCategories, user: curUser});
};
// Handle book update on POST.
exports.user_update_post = async function(req, res) {
    let listCategories=await category.getListCategory(); 
    let user=null
    user = await firebase.auth().currentUser
    let data= await fetch("https://api-scttshop-v2.herokuapp.com/api/customers/"+user.email)
    user= await data.json()
    let curUser={
        email: user.email,
        displayName: user.fullName,
        avatar: user.avatar,
        address: user.address,
        phoneNumber: user.phoneNumber,
        verified: user.verified
    }
    await axios({
        method: 'PUT',
        url: 'https://api-scttshop-v2.herokuapp.com/api/customers/'+curUser.email,
        data: {
          email: curUser.email,
          fullName: req.body.displayName,
          avatar: user.avatar,
          address: req.body.address,
          phoneNumber:req.body.phone,
          totalBuy: user.totalBuy,
          verified: curUser.emailVerified
        }
    }).then(()=>{
        req.session.isLogged = true;
        req.session.user = user

    })
    .catch(err => {
        console.log(err)
        //res.render('user/my_account',{listCategory: listCategories, user: currentUser ,code: "-1"});
    }) 
    res.redirect("/user/detailUser")
};
