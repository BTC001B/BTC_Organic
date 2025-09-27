const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // adjust path if needed

const SearchHistory = sequelize.define("SearchHistory", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true, // set false if you always want a user linked
  },
  query: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, 
  tableName: "search_history", 
});

module.exports = SearchHistory;
