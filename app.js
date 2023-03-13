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

app.get('/', routes.login);

app.get('/registrarse', routes.registrarse);

app.get('/desa', routes.desarUsuari);

app.get('/login', routes.login);

app.get('/autenticacio', routes.autenticarUsuari);

app.get('/calendari', routes.calendari);

app.get('/classes', routes.retornaClasses);

app.get('/usuaris',routes.retornaUsuaris);

app.get('/crearClasse', routes.crearClasse);

app.get('/modificarClasse', routes.modificarClasse);

app.get('/eliminarClasse', routes.eliminarClasse);

app.get('/uneixClasse', routes.uneixClasse);

app.listen(3000, function () {
  console.log('Servidor escoltant port http://localhost:3000');
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
