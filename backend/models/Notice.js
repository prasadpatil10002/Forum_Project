// models/Notice.js
const User = require('./User');
const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const Notice = sequelize.define('notice', {
  noticeid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
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
  filename: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
},{
  timestamps: false,
});

Notice.belongsTo(User, {foreignKey: 'userid'});



module.exports = Notice;
