const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // adjust path if needed

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  imageUrl: DataTypes.STRING,
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tags: {
    type: DataTypes.STRING, // e.g., "Herbal, Immunity, Organic"
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  discount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  sellCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  viewCount: {   // 👈 Added field
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isTrend:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true
  }
});

module.exports = Product;
