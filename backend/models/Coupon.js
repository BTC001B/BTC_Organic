const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const Coupon = sequelize.define('Coupon', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    discountType: {
      type: DataTypes.ENUM('flat', 'percentage'),
      allowNull: false
    },
    discountValue: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    minAmount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    maxUsage: {
      type: DataTypes.INTEGER,
      defaultValue: 100
    },
    usedCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
module.exports = Coupon;
