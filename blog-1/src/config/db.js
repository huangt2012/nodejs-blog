const env = process.env.NODE_ENV;

const MYSQL_CONFIG = env === 'production' ? {
  host: 'localhost',
  password: 'jia=2827061',
  user: 'root',
  port: 3306,
  database: 'blog'
} : {
  host: 'localhost',
  password: 'jia=2827061',
  user: 'root',
  port: 3306,
  database: 'blog'
};

module.exports = {
  MYSQL_CONFIG
}