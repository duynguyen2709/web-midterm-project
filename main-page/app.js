var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts=require('express-ejs-layouts');
require('es6-promise').polyfill();
require('isomorphic-fetch');


var app = express();
var indexRoutes = require('./routes/index.js');
var userRoutes=require('./routes/user.js');
var productRoutes=require('./routes/product.js');
var orderRoutes=require('./routes/order.js');
var checkoutRoutes=require('./routes/checkout.js');
var carttRoutes=require('./routes/mycart.js');


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



app.use('/', indexRoutes);
app.use('/user',userRoutes);
app.use('/products',productRoutes);
app.use('/order',orderRoutes);
app.use('/check-out',checkoutRoutes);
app.use('/my-cart',carttRoutes);






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
