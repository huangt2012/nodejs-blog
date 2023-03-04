const xss = require('xss');
const Blog = require('../db/models/Blog');

const getList = async (author, keyword) => {
  const whereOpt = {};

  if (author) whereOpt.author = author;
  if (keyword) whereOpt.keyword = new RegExp(keyword)

  const list = await Blog.find(whereOpt).sort({ _id: -1 })

  return list;
}

const getDetail = async (id) => {
  const blog = await Blog.findById(id)

  return blog;
}

const newBlog = async (blogData = {}) => {
  const { author } = blogData;
  const title = xss(blogData.title);
  const content = xss(blogData.content);

  const insertData = await Blog.create({
    title,
    content,
    author
  })

  return {
    id: insertData._id
  }
}

const updateBlog = async (id, blogData = {}) => {
  const title = xss(blogData.title);
  const content = xss(blogData.content);

  const updateData = await Blog.findByIdAndUpdate(id, { title, content });

  return !!updateData;
}

const delBlog = async (id, author) => {
  const res = await Blog.findOneAndDelete({
    _id: id,
    author
  })

  return !!res;
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}