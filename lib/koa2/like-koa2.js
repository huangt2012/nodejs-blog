const http = require('http');

function compose(middlewareList) {
  return function (ctx) {
    function dispatch(i) {
      const fn = middlewareList[i];

      try {
        return Promise.resolve(
          fn(ctx, dispatch.bind(null, i + 1))
        )
      } catch (error) {
        return Promise.reject(error)
      }

    }

    return dispatch(0)
  }
}

class LikeKoa2 {
  constructor() {
    this.middlewareList = [];
  }

  use(fn) {
    this.middlewareList.push(fn);
    return this;
  }

  createContext(req, res) {
    return { req, res };
  }

  handleRequest(ctx, fn) {
    fn(ctx);
  }


  listren(...args) {
    const server = http.createServer((req, res) => {
      const fn = compose(this.middlewareList);

      return (req, res) => {

        const ctx = this.createContext(req, res);
        return this.handleRequest(ctx, fn)
      }
    })

    server.listen(...args);
  }
}

module.exports = LikeKoa2;