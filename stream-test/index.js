// 标准的输入输出
// process.stdin.pipe(process.stdout)

// 复制文件
// const fs = require('fs');
// const path = require('path');

// const fileName1 = path.resolve(__dirname, 'logs.txt');
// const fileName2 = path.resolve(__dirname, 'logs-copy.txt');

// const readStream = fs.createReadStream(fileName1);
// const writeStream = fs.createWriteStream(fileName2);

// readStream.pipe(writeStream);
// readStream.on('data', (chunk) => {
//   console.log(chunk.toString(), 'chunk')
// })
// readStream.on('end', () => {
//   console.log('copy done')
// })

const fs = require('fs');
const path = require('path');
const http = require('http');

const fileName1 = path.resolve(__dirname, 'logs.txt');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const readStream = fs.createReadStream(fileName1);

    readStream.pipe(res)
  }
})

server.listen(8888)

