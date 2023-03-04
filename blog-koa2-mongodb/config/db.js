const env = process.env.NODE_ENV;

const MYSQL_CONFIG = env === 'production' ? {
  url: 'mongodb://localhost:27017',
  database: 'blog'
} : {
  url: 'mongodb://localhost:27017',
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