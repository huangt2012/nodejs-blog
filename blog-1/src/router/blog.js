const { getList, getDetail } = require("../controller/blog");
const { SuccessModel } = require("../model/resModel");

const handlerBlogRouter = (req, res) => {
  const method = req.method;

  if (method === 'GET' && req.path === '/api/blog/list') {
    const { author = '', keyword = '' } = req.query;
    const listData = getList(author, keyword);

    return new SuccessModel(listData);
  }
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const { id } = req.query;
    const contentData = getDetail(id);

    return new SuccessModel(contentData);
  }

  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: '创建接口'
    }
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: '更新接口'
    }
  }

  if (method === 'POST' && req.path === '/api/blog/del') {
    return {
      msg: '删除接口'
    }
  }
}

module.exports = handlerBlogRouter;