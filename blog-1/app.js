const http = require('http');
const querystring = require('querystring');
const { set, get } = require('./src/db/redis');
const handlerBlogRouter = require('./src/router/blog');
const { handlerUserRouter, getCookieExpires } = require('./src/router/user');
const { access } = require('./src/utils/log');

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }

    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }

    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString();
    })

    req.on('end', () => {
      if (!postData) {
        resolve({});
        return;
      }

      resolve(
        JSON.parse(postData)
      )
    })
  })
}


const serverHandler = (req, res) => {
  // 写入访问日志
  access(`${req.method}--${req.url}--${req.headers['user-agent']}--${Date.now()}`)

  // 设置返回的数据格式
  res.setHeader('Content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Credentials', true); // 允许跨域传递 cookie
  // res.setHeader('Access-Control-Allow-Origin', '*') // 允许跨域的 origin ，* 代表所有的，谨慎使用
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8001') // 允许单个 origin ，可通过前端 JS location.origin 获取
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE') // 允许的 method
  
  // 获取 path
  const url = req.url;
  req.path = url.split('?')[0];

  // 解析 query
  req.query = querystring.parse(url.split('?')[1]);

  // 解析 cookie 
  req.cookie = {};
  const cookieStr = req.headers.cookie || ''; // k1=v1;k2=v2;
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }

    const [key, value] = item.split('=');
    req.cookie[key.trim()] = value.trim();
  });

  // 解析 session
  // const needSetCookie = !req.cookie.userid; // 如果没有 userid,设置 cookie
  // const userId = req.cookie.userid || `${Date.now()}__${Math.random()}`;

  // SESSION_DATA[userId] = SESSION_DATA[userId] || {};
  
  // req.session = SESSION_DATA[userId];

  // 解析 session (redis 版)
  const needSetCookie = !req.cookie.userid; // 如果没有 userid,设置 cookie
  const userId = req.cookie.userid || `${Date.now()}__${Math.random()}`;

  req.sessionId = userId;

  if (needSetCookie) {
    set(userId, {});
  }

  get(userId)
    .then((redisData) => {
      if (redisData === null) {
        // 初始化
        set(userId, {});
        // 设置 session
        req.session = {}
      } else {
        req.session = redisData;
      }

      // 处理 post data
      return getPostData(req);
    })
    .then((postData) => {
      req.body = postData;
      // blog 路由
      const blogResult = handlerBlogRouter(req, res);
      if (blogResult) {
        blogResult?.then((blogData) => {
          if (needSetCookie) {
            // 操作 cookie
            res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
          }

          res.end(
            JSON.stringify(blogData)
          )
        })
        return;
      }
    

      const userResult = handlerUserRouter(req, res);
      if (userResult) {
        userResult.then((userData) => {
          if (needSetCookie) {
            // 操作 cookie
            res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
          }

          res.end(
            JSON.stringify(userData)
          )
        })
        return;
      }

      res.writeHead(400, { 'Content-type': 'text/plain' });
      res.write('404 Not Found\n');
      res.end()
    })
}

module.exports = serverHandler;