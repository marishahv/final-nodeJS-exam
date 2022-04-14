
const jwt = require('jsonwebtoken')
const logger = require('../logger');
const secret = process.env.SECRET_TOKEN;

const auth = (req, res, next) => {
  const bearerToken = req.headers.authorization
  const userToken = bearerToken?.split(' ')[1];

  try {
    jwt.verify(userToken, secret)
    const decoded = jwt.verify(userToken, secret);
    req.email = decoded.email;
    logger.info('Token verified.');

    return next();
  } catch (err) {
    logger.error(`Error while authencation: ${err}`);
    res.status(401)
    res.send({
      code: 401,
      error: 'You are not unauthorized'
    })
  }
}

module.exports = auth;
