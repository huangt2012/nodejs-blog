const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config/db');

// 创建对象
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始链接
connection.connect();

// 统一执行 sql 语句
function exec(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      
      resolve(res);
    })
  })
}

module.exports = {
  exec,
  escape: mysql.escape
}