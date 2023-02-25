const { getList, getDetail, newBlog, updateBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

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
    req.body.author = 'zhangsan'
    const result = newBlog(req.body)

    return result.then((data) => {
      return new SuccessModel(data)
    })
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
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
    req.body.author = 'zhangsan'
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