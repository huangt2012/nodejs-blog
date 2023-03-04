const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'blog';

const client = new MongoClient(url, {});

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users');

  // 新增
  // const result = await collection.insertOne({
  //   username: 'zhansan',
  //   password: 123,
  //   realname: '张三'
  // })

  // 查询
  const result = await collection.find({}).toArray();

  // 更新
  // const result = await collection.updateOne({ username: 'zhangsan' }, { $set: { realname: '张三A' } });

  // 删除
  // const result = await collection.deleteMany({ username: 'zhangsan' })
  

  return result;
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());