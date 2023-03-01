var express = require('express');
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');
var router = express.Router();

router.get('/list', function(req, res, next) {
  let { author = '' } = req.query;
  const { keyword = '', isadmin } = req.query;

  // 如果是管理员界面,进行权限校验并强制请求自己的博客列表
  if (isadmin) {

    if (req.session.username === null) {
      res.json(
        new ErrorModel('未登录')
      )
      return;
    }

    author = req.session.username;
    
  }
  
  const result = getList(author, keyword);

  return result.then((listData) => {
    res.json(
      new SuccessModel(listData)
    )
  })
});

router.get('/detail', function (req, res, next) {
  const result = getDetail(req.query.id);

  return result.then((contentData) => {
    res.json(
      new SuccessModel(contentData)
    )
  })
});

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username;

  const result = newBlog(req.body)

  return result.then((data) => {
    res.json(
      new SuccessModel(data)
    )
  })
});

router.post('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body);

  return result.then((val) => {
    if (val) {
      res.json(
        new SuccessModel()
      )
    } else {
      res.json(
        new ErrorModel('更新失败')
      )
    }
  })
});

router.post('/del', loginCheck, (req, res, next) => {
  req.body.author = req.session.username;
  const result = delBlog(req.body.id, req.body.author);

  return result.then((val) => {
    if (val) {
      res.json(
        new SuccessModel()
      )
    } else {
      res.json(
        new ErrorModel('删除失败')
      )
    }
  })
});


module.exports = router;
