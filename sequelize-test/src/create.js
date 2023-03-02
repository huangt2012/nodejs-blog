const { Sequelize } = require('sequelize');
const { User, Blog } = require('./model');

(async function () {
  // const zhangsan = await User.create({
  //   username: 'zhangsan',
  //   password: 123,
  //   realname: '张三'
  // })
  // console.log(zhangsan.dataValues)

  // const blog = await Blog.create({
  //   title: '博客3',
  //   content: '内容3',
  //   author: 'zhangsan'
  // })
  // console.log(blog.dataValues)

  // const zhangsan = await User.findOne({
  //   where: {
  //     username: 'zhangsan',
  //     password: 123
  //   }
  // })
  // console.log(zhangsan?.dataValues)
  const blogList = await Blog.findAll({
    where: {
      author: 'zhangsan',
      title: {
        [Sequelize.Op.like]: '%博客%',
      }
    },
    order: [
      ['id', 'desc']
    ]
  })

  console.log(blogList.map((item) => item.dataValues))
})()