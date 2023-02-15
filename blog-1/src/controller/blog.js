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

module.exports = {
  getList,
  getDetail
}