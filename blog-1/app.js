const http = require('http');
const querystring = require('querystring');
const handlerBlogRouter = require('./src/router/blog');
const { handlerUserRouter, getCookieExpires } = require('./src/router/user');

const SESSION_DATA = {};

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
  // 设置返回的数据格式
  res.setHeader('Content-type', 'application/json');

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
  const needSetCookie = !req.cookie.userid; // 如果没有 userid,设置 cookie
  const userId = req.cookie.userid || `${Date.now()}__${Math.random()}`;

  SESSION_DATA[userId] = SESSION_DATA[userId] || {};
  
  req.session = SESSION_DATA[userId];


  // 获取 post data
  getPostData(req).then((postData) => {
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