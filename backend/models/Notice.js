// models/Notice.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Department = require('./Department');

const Notice = sequelize.define('notice', {
  noticeid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
});

Notice.belongsTo(Department, { foreignKey: 'departmentid', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Notice;
