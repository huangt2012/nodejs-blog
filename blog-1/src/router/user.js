const { login } = require("../controller/user");
const { set } = require("../db/redis");
const { ErrorModel, SuccessModel } = require("../model/resModel");

const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000); // 设置 24 小时过期时间

  return d.toGMTString()
}

const handlerUserRouter = (req, res) => {
  const method = req.method;

  if (method === 'GET' && req.path === '/api/user/login') {
    const { username, password } = req.query;

    const result = login(username, password);

    return result.then((data) => {
      if (data.username) {

        // 设置 session
        req.session.username = data.username;
        req.session.realname = data.realname;

        // 同步到 redis
        set(req.sessionId, req.session);

        return new SuccessModel();
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }

  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username) {
      return Promise.resolve(
        new SuccessModel({
          username: req.session.username
        })
      )
    }

    return Promise.resolve(
      new ErrorModel('用户未登录')
    )
  }
}

module.exports = {
  handlerUserRouter,
  getCookieExpires
};