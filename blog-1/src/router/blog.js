const { getList, getDetail, newBlog, updateBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handlerBlogRouter = (req, res) => {
  const method = req.method;
  const {id} = req.query;

  if (method === 'GET' && req.path === '/api/blog/list') {
    const { author = '', keyword = '' } = req.query;
    const listData = getList(author, keyword);

    return new SuccessModel(listData);
  }
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const contentData = getDetail(id);

    return new SuccessModel(contentData);
  }

  if (method === 'POST' && req.path === '/api/blog/new') {
    const blogData = newBlog(req.body)

    return new SuccessModel(blogData)
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
    const res = updateBlog(id, req.body);

    if (res) {
      return new SuccessModel()
    } else {
      return new ErrorModel('更新失败')
    }
  }

  if (method === 'POST' && req.path === '/api/blog/del') {
    const res = updateBlog(id);

    if (res) {
      return new SuccessModel()
    } else {
      return new ErrorModel('删除失败')
    }
  }
}

module.exports = handlerBlogRouter;