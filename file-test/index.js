const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, 'logs.txt'); 

// 读取文件
fs.readFile(fileName, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(data.toString())
})

// 写入文件
const content = '这是新写入的内容\n';
const options = {
  flag: 'a', // 追加内容,覆盖使用 w
}

fs.writeFile(fileName, content, options, (err) => {
  if (err) {
    console.log(err)
  }
})

// 判断文件是否存在
const exist = fs.existsSync(fileName);
console.log(exist, '===')