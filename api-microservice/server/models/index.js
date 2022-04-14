const config = require('config');
const { postgres } = require('../db');
const User = require('./user');
const Token = require('./token');
const Engine = require('./engine');
const CarBody = require('./carbody');
const Car = require('./car');

User.hasOne(Token, {
  foreignKey: 'user_id'
});

Token.belongsTo(User, {
  foreignKey: 'user_id'
});

Car.belongsTo(Engine, {
  foreignKey: 'engine_id'
})

Engine.hasOne(Car, {
  foreignKey: 'engine_id'
});

Car.belongsTo(CarBody, {
  foreignKey: 'carbody_id'
})

CarBody.hasOne(Car, {
  foreignKey: 'carbody_id'
});

module.exports = { User, Token, Engine, CarBody, Car };
