const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017';
const dbName = 'blog';

mongoose.connect(`${url}/${dbName}`).then(() => console.log('connected'));

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err)
});

db.once("open", () => {
  console.log('open')
});

module.exports = mongoose;