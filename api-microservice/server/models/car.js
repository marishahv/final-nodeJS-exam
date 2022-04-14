const { v4 } = require('uuid');
const { DataTypes } = require('sequelize');
const Engine = require('./engine');
const CarBody = require('./carbody');
const { sequelize } = require('../db');

  const Car = sequelize.define('Car', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    engine_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Engine,
        key: 'id',
      },
    },
    carbody_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CarBody,
        key: 'id',
      },
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 100,
        min: 3,  
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
    {
      modelName: 'Car',
      sequelize
    }
  );

  Car.beforeCreate(car => {
    car.id = v4(); 
  });

  Car.beforeBulkCreate(cars => {
    cars.forEach(car => {
      car.id = v4();
    });
  })

module.exports = Car;
