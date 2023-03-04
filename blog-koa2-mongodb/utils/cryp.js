const crypto = require('crypto');

// 密匙
const SECRET_KEY = 'JJDJid_8878#'; // 任意字符串

/**
 * md5 加密
 * @param {*} str 
 */
function md5(content) {
  const md5 = crypto.createHash('md5');

  return md5.update(content).digest('hex');
}

function genPassword(password) {
  const content = `password=${password}&key=${SECRET_KEY}`;

  return md5(content);
}

module.exports = {
  genPassword
}