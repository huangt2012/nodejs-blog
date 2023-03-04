const Sequelize = require('sequelize');
const seq = require('../seq');

const Blog = seq.define(
  'blog',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: { 
      type: Sequelize.TEXT,
      allowNull: false
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }
)

module.exports = Blog;