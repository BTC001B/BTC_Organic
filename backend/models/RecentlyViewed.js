const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User =require('./User');
const Product =require('./Product');

const RecentlyViewed = sequelize.define('RecentlyViewed', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  viewedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'recently_viewed',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'productId']
    }
  ]
});
RecentlyViewed.belongsTo(User, { foreignKey: 'userId' });
RecentlyViewed.belongsTo(Product, { foreignKey: 'productId' });

module.exports = RecentlyViewed;
