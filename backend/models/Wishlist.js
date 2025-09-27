const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User =require('./User');
const Product =require('./Product');


const Wishlist = sequelize.define('Wishlist', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'wishlists',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'productId'] // Prevent duplicates
    }
  ]
});

Wishlist.belongsTo(User, { foreignKey: 'userId' });
Wishlist.belongsTo(Product, { foreignKey: 'productId' });


module.exports = Wishlist;
