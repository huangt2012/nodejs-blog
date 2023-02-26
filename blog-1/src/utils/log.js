const fs = require('fs');
const path = require('path');

/**
 * 写日志
 * @param {*} writeStream 
 * @param {*} log 
 */
function writeLog(writeStream, log) {
  writeStream.write(log + '\n');
}

/**
 * 生成 write stream
 * @param {*} fileName 
 * @returns 
 */
function createWriteStream(fileName) {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName);
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })

  return writeStream;
}

/**
 * 写访问日志
 */
const accessWriteStream = createWriteStream('access.log');
function access(log) {
  writeLog(accessWriteStream, log);
}

/**
 * 写事件日志
 */
const eventWriteStream = createWriteStream('event.log');
function event(log) {
  writeLog(eventWriteStream, log);
}

/**
 * 写错误日志
 */
const errorWriteStream = createWriteStream('error.log');
function errorLog(log) {
  writeLog(errorWriteStream, log);
}

module.exports = {
  access,
  event,
  errorLog
}