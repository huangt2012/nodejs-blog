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

const REDIS_CONFIG = env === 'production' ? {
  host: '127.0.0.1',
  port: 6379,
} : {
  host: '127.0.0.1',
  port: 6379,
};

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
}