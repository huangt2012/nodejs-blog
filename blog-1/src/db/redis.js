const redis = require('redis');
const { REDIS_CONFIG } = require('../config/db');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

(async function () {
  // 连接
  await redisClient.connect()
    .then(() => console.log('redis connect successed'))
    .catch((e) => console.error(e))
})()


/**
 * 设置
 * @param {*} key 
 * @param {*} value 
 */
async function set(key, value) {
  await redisClient.set(key, typeof value === 'object' ? JSON.stringify(value) : value);
}

/**
 * 获取
 * @param {*} key 
 * @returns 
 */
async function get(key) {
  try {
    let value = await redisClient.get(key);

    if (value === null) return value;

    try {
      value = JSON.parse(value); // 尝试转换成js对象
    } catch (error) { }

    return value;
  } catch (error) {
    throw error;
  }
}

module.exports = { get, set }