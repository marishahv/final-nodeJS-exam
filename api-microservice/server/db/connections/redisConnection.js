const redis = require('redis');
const logger = require('../../logger');

const redisConnect = () => {
  const client = redis.createClient();

  client.on('error', (err) => {
    logger.error(`Redis client error: ${err}`);
    console.error(err);
  });
  
  client.on('connect', () => {
    const msg = 'Redis connection is ready...';
    logger.info(msg);
    console.log(msg);
  });

  return client;
}

module.exports = redisConnect;
