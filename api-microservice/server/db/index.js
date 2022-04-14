const sequelize = require('./connections/postgresConnection');
const redisConnect = require('./connections/redisConnection');


module.exports = {
  redis: {
    connect: redisConnect
  }, 
  sequelize
};