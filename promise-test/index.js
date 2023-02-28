const fs = require('fs');
const path = require('path');

function getFileContent(fileName) {
  

  return new Promise((resolve, reject) => {
      const fullFileName = path.resolve(__dirname, 'files', fileName);

      fs.readFile(fullFileName, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
    
        resolve(JSON.parse(data.toString()))
      })
  })
}

// getFileContent('a.json').then((aData) => {
//   console.log(aData);
//   return getFileContent(aData.next)
// }).then((bData) => {
//   console.log(bData)

//   return getFileContent(bData.next)
// }).then(cData => {
  
//     console.log(cData)
  
// }) 


// async await 要点
// 1. await 后面可以追加 promise 对象,获取 resolv 的值
// 2. await 必须包裹在 async 中
// 3. async 函数执行后返回的也是 promise 对象
// 4. try-catch 可以捕获 reject 的值

async function readFiles() {
  const aData = await getFileContent('a.json');
  console.log(aData);
  const bData = await getFileContent(aData.next);
  console.log(bData)
}

readFiles()
