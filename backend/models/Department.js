// models/Department.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Department = sequelize.define('department', {
  departmentid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  departmentname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Department;
