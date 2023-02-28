const router = require('koa-router')();

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  ctx.body = {
    errno: 0,
    data: []
  }
})

module.exports = router
