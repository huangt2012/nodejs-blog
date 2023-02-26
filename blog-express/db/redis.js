const redis = require('redis');
const { REDIS_CONFIG } = require('../config/db');

// 创建客户端
const redisClient = redis.createClient({
  url: `redis://${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`,
  legacyMode: true
});

// 连接
redisClient.connect()
  .then(() => console.log('redis 连接成功'))
  .catch((err) => console.log(err))

module.exports = redisClient