var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// ====== http 实例
var app = express();

// ====== 视图引擎(前端使用)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// ====== 记录日志
app.use(logger('dev'));

// ====== 处理 post data,将请求数据放置在 res.body 中
app.use(express.json()); // 处理 json 类型的数据
app.use(express.urlencoded({ extended: false })); // 处理其他类型的数据

// ====== 解析 cookie
app.use(cookieParser());

// ====== 处理 public 文件夹(前端使用)
app.use(express.static(path.join(__dirname, 'public')));

// ====== 注册路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// ====== catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
