const Sequelize = require('sequelize');

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

// 生产环境使用连接池
// conf.pool = {
//   max: 5, // 连接池中最大的连接数
//   min: 0,
//   idle: 10 * 1000, // 如果一个连接 10s 内没有被使用,则释放
// }

const seq = new Sequelize(
  'blog_sequelize', // 对应的数据库
  'root', // 用户
  'jia=2827061', // 密码
  conf
)

module.exports = seq;