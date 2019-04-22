var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts=require('express-ejs-layouts');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use('/public', express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts)




app.get('/', function(req, res) {
  res.render('HomePage');
});
app.get('/user', function(req, res) {
  res.render('/MyAccount');
});
app.get('/MyCart', function(req, res) {
  res.render('MyCart');
});
app.get('/MyAccount', function(req, res) {
  res.render('MyAccount');
});

app.get('/ProductDetail', function(req, res) {
  res.render('ProductDetail');
});

app.get('/AccountDetail', function(req, res) {
  res.render('AccountDetail');
});
app.get('/Aokhoac', function(req, res) {
  res.render('Aokhoac');
});
app.get('/Checkout', function(req, res) {
  res.render('Checkout');
});
app.get('/ForgotPassword', function(req, res) {
  res.render('ForgotPassword');
});
app.get('/Customer-Orders', function(req, res) {
  res.render('Customer-Orders');
});
app.get('/OrderDetail', function(req, res) {
  res.render('Order-Detail');
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
