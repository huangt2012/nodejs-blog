const Sequelize = require('sequelize');
const Blog = require("../db/model/Blog");
const xss = require('xss')

const getList = async (author, keyword) => {
  const whereOpt = {};
  if (author) whereOpt.author = author;
  if (keyword) whereOpt.keyword = keyword;
 
  const list = await Blog.findAll({
    // 条件
    where: whereOpt,
    // 排序
    order: [
      ['id', 'desc']
    ]
  })

  return list.map((item) => item.dataValues)
}

const getDetail = async (id) => {
  const detail = await Blog.findOne({
    // 条件
    where: { id },
  })

  return detail ? detail.dataValues : null;
}

const newBlog = async (blogData = {}) => {

  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const author = blogData.author;
  
  const blog = await Blog.create({ title, content, author })

  return {
    id: blog.dataValues.id
  }
}

const updateBlog = async (id, blogData = {}) => {
  const title = xss(blogData.title);
  const content = xss(blogData.content);

  const res = await Blog.update(
    { title, content },
    { where: { id }}
  )

  return res[0] >= 1;
}

const delBlog = async (id, author) => {
  const res = await Blog.destroy({
    where: { id, author }
  })
  return res >= 1;
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}