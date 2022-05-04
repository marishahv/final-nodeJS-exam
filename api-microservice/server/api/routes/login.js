const express = require('express');
const jwt = require('jsonwebtoken');
const logger = require('../../logger');
const { User, Token } = require('../../models');
const getError = require('../../utils');
const cors = require('cors')


const router = express.Router();

const secret = process.env.SECRET_TOKEN;

const corsOptions = {
  origin: "http://localhost:3000",
}

// Enable CORS for a Single Route
router.post('/', cors(corsOptions), async (req, res, next) => {
  const { body: { email } } = req;

  const user = await User.findOne({ where: { email }});

  if (!user) {
    logger.error(`Error: User with $(email) doesn't exists`);
    return next(getError(404, `User doesn't exists`));
  }
  logger.info(`User with $(email) found.`);

  const { dataValues: { id: userId }} = user; 

  try {
    const token = jwt.sign({
      email
    }, secret, { expiresIn: '1h' });
    
    await Token.create({user_id: userId, token});
    logger.info('Token is created.');
    res.status(201).send(token);
    } catch (err) {
      logger.error(`Error in token creation: ${err}`);
      next(err);
    }
});

module.exports = router;
