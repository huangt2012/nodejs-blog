const { getList, getDetail, newBlog, updateBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel('用户未登录')
    )
  }
}

const handlerBlogRouter = (req, res) => {
  const method = req.method;
  const { id } = req.query;

  if (method === 'GET' && req.path === '/api/blog/list') {
    const { author = '', keyword = '' } = req.query;
    const result = getList(author, keyword);

    return result.then((listData) => {
      return new SuccessModel(listData)
    })
  }

  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id);

    return result.then((contentData) => {
      return new SuccessModel(contentData)
    })
  }

  if (method === 'POST' && req.path === '/api/blog/new') {

    const loginCheckResult = loginCheck(req);

    if (loginCheckResult) {
      return loginCheckResult;
    }

    req.body.author = req.session.username;
    const result = newBlog(req.body)

    return result.then((data) => {
      return new SuccessModel(data)
    })
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
    const loginCheckResult = loginCheck(req);

    if (loginCheckResult) {
      return loginCheckResult;
    }

    const result = updateBlog(id, req.body);

    return result.then((res) => {
      if (res) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新失败')
      }
    })
  }

  if (method === 'POST' && req.path === '/api/blog/del') {
    const loginCheckResult = loginCheck(req);

    if (loginCheckResult) {
      return loginCheckResult;
    }

    req.body.author = req.session.username;
    const result = updateBlog(id, author);

    return result.then((res) => {
      if (res) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除失败')
      }
    })
  }
}

module.exports = handlerBlogRouter;