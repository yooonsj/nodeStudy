var express    = require('express');
var bodyparser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var logger = require('morgan');
var flash = require('connect-flash');

var app        = express();

app.use(logger('dev'));
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(session({
    secret: 'NODEJS_STUDY',
    resave: false,
    saveUninitialized: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(express.static('libs'));

app.use(flash());

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// routes
var mainRouter = require('./routes/main');
var userRouter = require('./routes/login');

app.use('/', mainRouter);
app.use('/', userRouter);

module.exports = app;
