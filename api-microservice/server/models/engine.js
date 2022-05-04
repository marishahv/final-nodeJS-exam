const { v4 } = require('uuid');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

  const Engine = sequelize.define('Engine', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    power: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    }
    },
    {
      modelName: 'Engine',
      tableName: 'Engine',
      freezeTableName: true,
      sequelize
    }
  );

  Engine.beforeCreate(engine => {
    engine.id = v4();
  });

  Engine.beforeBulkCreate(engines => {
    engines.forEach(engine => {
      engine.id = v4();
    });
  });

module.exports = Engine;
