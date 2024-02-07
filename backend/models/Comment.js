// models/Comment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');
const Post = require('./Post');

const Comment = sequelize.define('comment', {
  commentid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  }
},{ 
  timestamps: false,
});

Comment.belongsTo(User, { foreignKey: 'userid', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postid', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Comment;
