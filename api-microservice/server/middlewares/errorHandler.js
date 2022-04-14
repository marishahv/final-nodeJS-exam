const { ValidationError } = require('sequelize');
const logger = require('../logger');

const errorHandler = (error, req, res, next) => {
  let validationErrorMessage;
  if (error instanceof ValidationError) {
    const message = error?.errors[0]?.message;
    validationErrorMessage = message ? `Validation error: ${message}` : ''
  }

  logger.error(validationErrorMessage || error.message);
  
  return res
  .status(error.statusCode || 500)
  .json({
    code: error.statusCode || 500,
    message: validationErrorMessage || error.message,
  })
};

module.exports = errorHandler;
