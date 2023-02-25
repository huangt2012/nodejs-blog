const mysql = require('mysql');

// 创建对象
const connection = mysql.createConnection({
  host: 'localhost',
  password: 'jia=2827061',
  user: 'root',
  port: 3306,
  database: 'blog'
});

// 开始链接
connection.connect();

// 执行 sql 语句
const sql = 'select * from users';
connection.query(sql, (err, res) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(res);
})

connection.query('insert ')

// 关闭连接
connection.end();