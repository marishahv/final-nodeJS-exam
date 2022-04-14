const winston = require('winston');

module.exports = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: '../../logs/info.log'
    }),
    new winston.transports.File({
      level: 'error',
      filename: '../../logs/error.log'
    })
  ]
});
