var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const session = require("express-session");
let RedisStore = require("connect-redis")(session);

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

// ====== http 实例
var app = express();

// ====== 视图引擎(前端使用)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// ====== 记录日志
const ENV = process.env.NODE_ENV;
if (ENV === 'production') {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  });

  app.use(logger('combined', {
    stream: writeStream
  }))
} else {
  // 测试环境
  app.use(logger('dev'));
}

// ====== 处理 post data: 可以通过 req.body 获取
app.use(express.json()); // 处理 json 类型的数据
app.use(express.urlencoded({ extended: false })); // 处理其他类型的数据

// ====== 解析 cookie: 可以通过 req.cookie 获取
app.use(cookieParser());

// 处理 redis
const redisClient = require('./db/redis');
const sessionStore = new RedisStore({
  client: redisClient
})

// ====== 处理 session: 可以通过 req.session 获取
app.use(session({
  secret: 'AJDJJjj_8878#', // 密匙
  cookie: {
    // path: '/', // 默认配置
    // httpOnly: true, // 默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore, // 如果不设置 store,session 直接存在内存中,如果有,则存在 redis 中
  resave: false,
  saveUninitialized: false
}))

// ====== 处理 public 文件夹(前端使用)
// app.use(express.static(path.join(__dirname, 'public')));

// ====== 注册路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

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
