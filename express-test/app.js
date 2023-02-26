const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('请求开始了....', req.method, req.url);
  next();
})

app.use((req, res, next) => {
  console.log('处理 cookie');

  req.cookie = {
    userId: '123'
  }

  next();
})

app.use((req, res, next) => {
  // 处理 post data
  setTimeout(() => {
    req.body = {
      a: 1,
      b: 2
    }

    next()
  })
})

app.use('/api', (req, res, next) => {
  console.log('处理路由')
  next()
})

app.get('/api', (req, res, next) => {
  console.log('get 路由')
  next()
})

app.post('/api', (req, res, next) => {
  console.log('post 路由')
  next()
})

app.get('/api/get-cookie', (req, res, next) => {
  res.json({
    errno: 0,
    data: req.cookie
  })
})

app.post('/api/get-post-data', (req, res, next) => {
  res.json({
    errno: 0,
    data: req.body
  })
})

app.use((req, res, next) => {
  console.log('处理 404')
  res.json({
    errno: -1,
    data: '404 not found'
  })
})

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})