const mongoose = require('../db');

const Schema = mongoose.Schema;

// 用 Schema 定义数据格式
const BlogSchema = new Schema({
  title: {
    type: String,
    required: true, // 必需的
  },
  content: String,
  author: {
    type: String,
    required: true, // 必需的
  }
})

// Model 对应 collection
const Blog = mongoose.model('blog', BlogSchema);

module.exports = Blog;