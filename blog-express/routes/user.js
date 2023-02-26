var express = require('express');
const { login } = require('../controller/user');
const { ErrorModel, SuccessModel } = require('../model/resModel');
var router = express.Router();

router.post('/login', function (req, res, next) {
  const { username, password } = req.body;

  const result = login(username, password);

  return result.then((data) => {
    if (data?.username) {

      // 设置 session
      req.session.username = data.username;
      req.session.realname = data.realname;

      res.json(
        new SuccessModel()
      );
    } else {
      res.json(
        new ErrorModel('登录失败')
      )
    }
  })
});

module.exports = router;
