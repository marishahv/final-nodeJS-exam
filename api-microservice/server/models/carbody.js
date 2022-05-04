const { v4 } = require('uuid');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

  const CarBody = sequelize.define('CarBody', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
    },
    {
      modelName: 'CarBody',
      tableName: 'CarBody',
      freezeTableName: true,
      sequelize
    }
  );

  CarBody.beforeCreate(carBody => {
    carBody.id = v4();
  })

  CarBody.beforeBulkCreate(carBodies => {
    carBodies.forEach(carBody => {
      carBody.id = v4();
    });
  })

module.exports = CarBody;
