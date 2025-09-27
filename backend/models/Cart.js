const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust path if needed
const User =require('./User');
const Product =require('./Product');

const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  }
}, {
  tableName: 'carts',
  timestamps: true,
});

// Example inside models/index.js
Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });


module.exports = Cart;
