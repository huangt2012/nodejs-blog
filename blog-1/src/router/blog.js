const handlerBlogRouter = (req, res) => {
  const method = req.method;

  if (method === 'GET' && req.path === '/api/blog/list') {
    return {
      msg: '列表接口'
    }
  }
  if (method === 'GET' && req.path === '/api/blog/detail') {
    return {
      msg: '详情接口'
    }
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