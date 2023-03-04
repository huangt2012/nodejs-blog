const mongoose = require('mongoose');
const { MYSQL_CONFIG } = require('../config/db');

mongoose.connect(`${MYSQL_CONFIG.url}/${MYSQL_CONFIG.database}`).then(() => console.log('connected'));

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err)
});

module.exports = mongoose;