const express = require('express');
const auth = require('../middlewares/auth');
const loginRouter = require('./routes/login');
const carsRouter = require('./routes/cars');
const userRouter = require('./routes/user');
const router = express.Router();

router.use('/user', userRouter);
router.use('/login', loginRouter);
router.use('/cars', auth, carsRouter);


module.exports = router;
