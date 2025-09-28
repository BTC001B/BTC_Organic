const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: 'user' // or 'admin'
},
imageurl:{
  type:DataTypes.STRING,
  allowNull:true
}

});



module.exports = User;
