const { loginCheck } = require("../controller/user");
const { ErrorModel, SuccessModel } = require("../model/resModel");

const handlerUserRouter = (req, res) => {
  const method = req.method;

  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;

    const result = loginCheck(username, password);

    return result.then((res) => {
      if (res.username) {
        return new SuccessModel()
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }
}

module.exports = handlerUserRouter;