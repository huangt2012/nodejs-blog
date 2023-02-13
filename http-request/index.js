const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const { url, method } = req; 
  const path = url.split('?')[0];
  const query = querystring.parse(url.split('?')[1]);

  // 设置返回数据格式为 JSON
  res.setHeader('Content-type', 'application/json');

  // 返回数据
  const resData = {
    method,
    path,
    query,
    url
  }

  if (method === 'GET') {
    res.end(
      JSON.stringify(resData)
    )
  }

  if (method === 'POST') {
    let postData = '';

    req.on('data', chunk => {
      postData += chunk.toString()
    })

    req.on('end', () => {
      resData.postData = postData;

      // 返回
      res.end(
        JSON.stringify(resData)
      )
    })
  }
})

server.listen(8000);

console.log('server listening on 8000 port')