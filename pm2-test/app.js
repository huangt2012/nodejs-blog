const http = require('http');

const server = http.createServer((req, res) => {
  // 设置返回数据格式为 JSON
  res.setHeader('Content-type', 'application/json');

  res.end(
    JSON.stringify({
      errno: 0,
      msg: 'pm2 test server'
    })
  )
})

server.listen(8000);

console.log('server listening on port 8000...')