const redis = require('redis');

(async function () {
  // 创建客户端
  const redisClient = redis.createClient(6379, '127.0.0.1');

  // 连接
  await redisClient.connect()
    .then(() => console.log('redis connect successed'))
    .catch((e) => console.error(e))
  
  // 测试
  await redisClient.set('myName', 'tinnyhuang');

  const myName = await redisClient.get('myName');
  console.log(myName);

  // 退出
  redisClient.quit();
})()