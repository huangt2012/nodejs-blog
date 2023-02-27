const http = require('http');
const slice = Array.prototype.slice;

class LikeExpress {
  constructor() {
    // 存放中间件的列表
    this.routes = {
      all: [], // app.use(...)
      get: [], // app.get(...)
      post: [] // app.post(...)
    }
  }

  /**
   * 分析路由
   * @param {string} path 
   */
  register(path) {
    const info = {};

    if (typeof path === 'string') {
      // 第一个参数是字符串类型
      info.path = path;
      // 从第二个参数开始,转为数组
      info.stack = slice.call(arguments, 1)
    } else {
      info.path = '/'
      // 从第一参数开始转为数组
      info.stack = slice.call(arguments, 0)
    }

    return info;
  }

  use() {
    const info = this.register.apply(this, arguments);
    this.routes.all.push(info)
  }

  get() {
    const info = this.register.apply(this, arguments);
    this.routes.get.push(info)
  }

  post() {
    const info = this.register.apply(this, arguments);
    this.routes.post.push(info)
  }

  // 核心的 next 机制
  handle(req, res, stack){
    const next = () => {
      // 拿到第一个中间件
      const middleware = stack.shift();

      if (middleware) {
        middleware(req, res, next)
      }
    }

    next()
  }

  match(method, url) {
    let stack = [];

    if (url === '/favicon.ico') {
      return stack;
    }

    let currRoutes = [];

    // 没有指定路径
    currRoutes.concat(this.routes.all);
    currRoutes.concat(this.routes[method]);

    currRoutes.forEach((info) => {
      if (url.indexOf(info.path) === 0) {
        stack = stack.concat(info.stack);
      }
    })

    return stack
  }

  listren(...args) {
    const server = http.createServer((req, res) => {
      req.json = (data) => {
        res.setHeader('Content-type', 'application/json');
        res.end(
          JSON.stringify(data)
        )
      }

      const url = req.url;
      const method = req.method.toLowerCase();

      const resultList = this.match(method, url);
      this.handle(req, res, resultList)
    })

    server.listen(...args);
  }
}

module.exports = () => {
  return new LikeExpress()
}