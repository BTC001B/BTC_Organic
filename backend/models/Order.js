const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");

const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  totalAmount: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "Pending" }, // Pending, Completed, Cancelled
}, {
  timestamps: true
});

Order.belongsTo(User, { foreignKey: "userId" });

module.exports = Order;
