const Sequelize = require('sequelize');
const { MYSQL_CONFIG } = require('../config/db');

const conf = {
  host: MYSQL_CONFIG.host,
  dialect: 'mysql'
}

// 生产环境使用连接池
if (process.env.NODE_ENV === 'production') {
  conf.pool = {
    max: 5, // 连接池中最大的连接数
    min: 0,
    idle: 10 * 1000, // 如果一个连接 10s 内没有被使用,则释放
  }
}

const seq = new Sequelize(
  MYSQL_CONFIG.database_seq, // 对应的数据库
  MYSQL_CONFIG.user, // 用户
  MYSQL_CONFIG.password, // 密码
  conf
)

module.exports = seq;