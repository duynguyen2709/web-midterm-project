var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UserModel = require('./models/userAccountModel');
var axios = require('axios');
var bcrypt = require('bcrypt');

// ################# ROUTER SECTION ############################

var indexRouter = require('./routes/index');
var mainRouter = require('./routes/main');
var chartRouter = require('./routes/chart');
var orderRouter = require('./routes/order');
var productRouter = require('./routes/product');
var userRouter = require('./routes/user');
var categoryRouter = require('./routes/category');
var promotionRouter = require('./routes/promotion');
var testRouter = require('./routes/userdetail');


var app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Express Session
app.use(session({
  secret: 'scttshop',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());


app.use("/handlers", express.static(path.join(__dirname, 'handlers')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/main', mainRouter);
app.use('/chart', chartRouter);
app.use('/order', orderRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/promotion', promotionRouter);
app.use('/userdetail', testRouter);


app.use(function (req, res, next) {
  if (req.protocol !== 'http') {
    return res.status(403).send({
      message: 'Not Support HTTPS. Login With HTTP instead.'
    });
  }
  // allow the request to continue
  next();
});


// ###############  PASSPORT AUTHENTICATE SECTION #####################

passport.use('local', new LocalStrategy({
    passReqToCallback: true
  },
  async function (req, username, password, done) {

    const user = await UserModel.getUser(username);

    if (user == null || user.username == null) {
      req.authError = "Người Dùng Không Tồn Tại";
      return done(null, false);
    }

    UserModel.comparePassword(password, user.password, function (err, isMatch) {
      if (err) throw err;

      if (isMatch) {
        axios.post('https://api-scttshop-v2.herokuapp.com/api/useraccounts/' + user.username + "/logon")
          .then((res) => console.log("Login Succeed!"));

        return done(null, user);
      } else {
        req.authError = "Sai Mật Khẩu";
        return done(null, false);
      }
    });

  }
));

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user);
});


app.post('/login',
  passport.authenticate('local', {
    failWithError: true
  }),
  function (req, res) {
    res.redirect('/userdetail');
  },
  function (err, req, res, next) {
    if (req.authError) {
      res.render('index', {
        errorText: req.authError
      });
    }
  }
);

// Endpoint to logout
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


///////////////////////////////

// ################## ERROR HANLDER SECTION ################3

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;