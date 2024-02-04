// models/Post.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');
const Department = require('./Department');

const Post = sequelize.define('post', {
  postid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

Post.belongsTo(User, { foreignKey: 'userid', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Post.belongsTo(Department, { foreignKey: 'departmentid', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Post;
