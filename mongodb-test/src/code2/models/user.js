const mongoose = require('../db');

const Schema = mongoose.Schema;

// 用 Schema 定义数据格式
const UserSchema = new Schema({
  username: {
    type: String,
    required: true, // 必需的
    unique: true, // 唯一的
  },
  password: Number,
  realname: String
})

// Model 对应 collection
const User = mongoose.model('user', UserSchema);

module.exports = User;