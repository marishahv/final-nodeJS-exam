const { v4 } = require('uuid');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../db');

  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
    },
    {
      modelName: 'User',
      tableName: 'User',
      freezeTableName: true,
      sequelize
    }
  );

  const encryptPassword = async (user) => {
    user.id = v4();
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
  };

  User.beforeCreate(async (user) => {
    await encryptPassword(user);
  });

  User.beforeBulkCreate((users) => {
    users.forEach(async (user) => {
      await encryptPassword(user);
    });
  });


module.exports = User;
