const Blog = require('../models/blog');

(async function () {
  
  // 新建博客
  // const blog = await Blog.create({
  //   title: '标题2',
  //   content: '内容2',
  //   author: 'zhangsan'
  // })

  // 获取列表
  // const list = await Blog.find({
  //   title: /标题/   // 正则表达式 模拟模糊查询
  // }).sort({ _id: -1 })

  // const blog = await Blog.findById('64031267a9a60f445c1c1a1b');

  // 修改博客
  const res = await Blog.findByIdAndUpdate(
    '64031267a9a60f445c1c1a1b',
    {
      title: '修改标题2',
      content: '修改内容2'
    },
    {
      new: true // 修改后返回新的内容
    }
  )
  

  console.log(res)
  
})()