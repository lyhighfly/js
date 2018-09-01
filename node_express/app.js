var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({dest:'../public/photos/'});

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photoRouter = require('./routes/photos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));//视图查找目录
app.set('view engine', 'ejs');//设置模板引擎,或者使用后缀名指定
app.set('view cache', false);
app.set('title', "SEXY");//程序级变量settings中获得此变量设置
app.set('photos', __dirname+'/public/photos');

app.use(logger('dev'));
app.use(express.json());
// app.use(bodyParser);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.get('/photos/download/:id', photoRouter.download(app.get('photos')));
app.get('/upload', photoRouter.form);
app.post('/upload', upload.single('uploadfile'), photoRouter.submit(app.get('photos')));
app.use('/users', usersRouter);
app.use('/', photoRouter.list);

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
