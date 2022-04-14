  
const config = require('config');
const { redis } = require('../../db');
const logger = require('../../logger');

const redisConfig = config.get('app.redis');
const client = redis.connect(redisConfig);

const getCache = (key) => {
  return new Promise((resolve, reject) => {
    logger.info('Creating a new Promise...')
    client.get(key, (err, reply) => {
      logger.info(`Getting from redis: key:${key}`)
      if (err) {
        logger.error(`Error in getting data from redis: ${err}`)
        return reject(err)
      }
      return resolve(reply)
    })
  })
}

const setCache = (key, value) => {
  return new Promise((resolve, reject) => {
    client.set(key, value, (err) => {
      if (err) {
        logger.error(`Error in setting name from redis: ${err}`)
        return reject(err)
      }
      return resolve()
    })
  })
}

const deleteCache = async (key) => {
  return new Promise((resolve, reject) => {
    client.del(key, (err, succeeded) => {
      if (succeeded) {
        logger.info(`Deleted cache: ${key}`)
      } else {
        logger.error(err)
      }
    });
  })
}

const clearCache = () => {
  return new Promise((resolve, reject) => {
    client.flushdb((err, succeeded) => {
      if (succeeded) {
        logger.info('Cache cleared')
      } else {
        logger.error(err)
      }
    });
  })
}

module.exports = { getCache, setCache, clearCache, deleteCache };
