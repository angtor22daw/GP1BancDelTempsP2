var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const routes = require('./routes');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/salutacio', function (req, res) {
  res.send('Hola Món!');
});

routes.verificarSiExisteixAdmin();

app.get('/', function (req, res) {
  res.redirect('/login');
});

app.get('/registrarse', function (req, res) {
  res.sendFile(__dirname + '/public/html/registrarse.html');
});

app.get('/desa', routes.desarUsuari);

app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/public/html/login.html');
  });

app.get('/autenticacio', routes.autenticarUsuari);

app.get('/calendari', function (req, res) {
  res.sendFile(__dirname + '/public/html/calendari.html');
});

app.listen(3000, function () {
  console.log('Servidor escoltant port 3000');
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
