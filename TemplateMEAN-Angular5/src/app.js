var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();
var db = require('./db');

// view engine setup
// app.set('views', path.join(__dirname, 'app'));
// app.set('view engine', 'html');

app.use(favicon(path.join(__dirname, '../dist', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));

// app.use('/index', express.static(path.join(__dirname, '../dist')));
app.use('/index', index);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

// Connect to Mongo on start
db.connect('mongodb://localhost:27017/', 'default', function(err){
  if(err){
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else{
      console.log('Connected to Mongo...');
  }
});

module.exports = app;