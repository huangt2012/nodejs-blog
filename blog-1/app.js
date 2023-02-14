const http = require('http');

const serverHandler = (req, res) => {
  // 设置返回的数据格式
  res.setHeader('Content-type', 'application/json');

  const resData = {
    name: 'Test',
    id: 1,
    env: process.env.NODE_ENV
  }

  res.end(
    JSON.stringify(resData)
  )
}

module.exports = serverHandler;