const Sequelize = require('sequelize');
const seq = require('./db');

// User 模型
const User = seq.define(
  'user', // 对应到数据库表 users
  {
    // id 不用自定义
    username: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    realname: { type: Sequelize.STRING  }
  }
);

const Blog = seq.define(
  'blog',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: { 
      type: Sequelize.TEXT,
      allowNull: false
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }
)

module.exports = {
  Blog,
  User
}