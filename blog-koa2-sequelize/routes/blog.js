const router = require('koa-router')()
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

router.prefix('/api/blog');

router.get('/list', async function(ctx, next) {
  let author = ctx.query.author ?? '';

  // 如果是管理员界面,进行权限校验并强制请求自己的博客列表
  if (ctx.query.isadmin) {

    if (ctx.session.username === null) {
      ctx.body = new ErrorModel('未登录')
      return;
    }

    author = ctx.session.username;
    
  }
  
  const listData = await getList(author, ctx.query.keyword);

  ctx.body = new SuccessModel(listData);
});

router.get('/detail', async function (ctx, next) {
  const contentData = await getDetail(ctx.query.id);

  ctx.body = new SuccessModel(contentData)
});

router.post('/new', loginCheck, async (ctx, next) => {
  ctx.request.body.author = ctx.session.username;

  const data = await newBlog(ctx.request.body)

  ctx.body = new SuccessModel(data);
});

router.post('/update', loginCheck, async (ctx, next) => {
  const result = await updateBlog(ctx.query.id, ctx.request.body);

  if (result) {
    ctx.body = new SuccessModel();
    return;
  } 
  
  ctx.body = new ErrorModel('更新失败')
});

router.post('/del', loginCheck, async (ctx, next) => {
  const body = ctx.request.body;
  body.author = ctx.session.username;

  const result = await delBlog(ctx.query.id, body.author);

  if (result) {
    ctx.body = new SuccessModel();
    return;
  } 
  
  ctx.body = new ErrorModel('删除失败');
});


module.exports = router;
