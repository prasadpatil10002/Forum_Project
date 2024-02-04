
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a PostgreSQL connection pool
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false // Disable logging to console
  });
  
module.exports = sequelize;