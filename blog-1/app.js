const http = require('http');
const handlerBlogRouter = require('./src/router/blog');
const handlerUserRouter = require('./src/router/user');


const serverHandler = (req, res) => {
  // 设置返回的数据格式
  res.setHeader('Content-type', 'application/json');

  // 获取 path
  const url = req.url;
  req.path = url.split('?')[0];

  // blog 路由
  const blogData = handlerBlogRouter(req, res)
  if (blogData) {
    res.end(
      JSON.stringify(blogData)
    )
    return;
  }

  const userData = handlerUserRouter(req, res);
  if (userData) {
    res.end(
      JSON.stringify(userData)
    )
    return;
  }

  res.writeHead(400, { 'Content-type': 'text/plain' });
  res.write('404 Not Found\n');
  res.end()
}

module.exports = serverHandler;