const { v4 } = require('uuid');
const { DataTypes } = require('sequelize');
const User = require('./user');
const { sequelize } = require('../db');

  const Token = sequelize.define('Token', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    }},
    {
      modelName: 'Token',
      sequelize
    }
  );

  Token.beforeCreate(token => {
    token.id = v4(); 
  });

module.exports = Token;