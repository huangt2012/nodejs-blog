const http = require('http');

const server = http.createServer((req, res) => {
  console.log('访问了');
  console.error('假装出错了');
  
  // 设置返回数据格式为 JSON
  res.setHeader('Content-type', 'application/json');

  if (req.url === '/err') {
    throw new Error('/err 出错了')
  }

  res.end(
    JSON.stringify({
      errno: 0,
      msg: 'pm2 test server'
    })
  )
})

server.listen(8000);

console.log('server listening on port 8000...')