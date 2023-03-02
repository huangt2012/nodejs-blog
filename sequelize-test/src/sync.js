const seq = require('./db');

// 需要同步的模型
require('./model');

// 测试连接
seq.authenticate().then(() => {
  console.log('connect successed')
}).catch((err) => {
  console.log(err)
})

// 同步数据
seq.sync({ focus: true }).then(() => {
  process.exit()
})