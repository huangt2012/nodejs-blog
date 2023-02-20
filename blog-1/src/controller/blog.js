const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: 'title A',
      content: 'content A',
      createTime: 1676475583160,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: 'title B',
      content: 'content B',
      createTime: 1676475625078,
      author: 'lisi'
    }
  ]
}

const getDetail = (id) => {
  return {
    id: 1,
    title: 'title A',
    content: 'content A',
    createTime: 1676475583160,
    author: 'zhangsan'
  }
}

const newBlog = (blogData = {}) => {
  return {
    id: 3
  }
}

const updateBlog = (id, blogData = {}) => {
  return true
}

const delBlog = (id) => {
  return true;
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}