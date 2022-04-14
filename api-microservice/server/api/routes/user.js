const express = require('express');
const logger = require('../../logger');
const { User } = require('../../models');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const { body: { email, password, username } } = req;

  try {
    const user = await User.create({ email, password, username });
    logger.info('User is created.');
    res.status(201).send({ user })
  } catch (err) {
    logger.error(`Error in creating user ${err}`)
    next(err);
  }
});

module.exports = router;
