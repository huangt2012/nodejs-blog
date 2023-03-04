const User = require("../models/User");

(async function () {
  
  // 创建用户
  // const user = await User.create({
  //   username: 'zhangsan',
  //   password: 123,
  //   realname: '张三'
  // })
  
  const result = await User.find({});

  console.log(result)
  
})()