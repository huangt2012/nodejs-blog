const { loginCheck } = require("../controller/user");
const { ErrorModel, SuccessModel } = require("../model/resModel");

const handlerUserRouter = (req, res) => {
  const method = req.method;

  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;

    const res = loginCheck(username, password);

    if (res) {
      return new SuccessModel()
    } else {
      return new ErrorModel('登录失败')
    }
  }
}

module.exports = handlerUserRouter;