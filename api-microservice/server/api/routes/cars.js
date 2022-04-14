const express = require('express');
const router = express.Router();
const logger = require('../../logger');
const { Car, CarBody } = require('../../models');
const getError = require('../../utils');
const isEmpty = require('lodash/isEmpty');
const { 
  getCars, 
  getCarDetails, 
  getCarBodyTypes, 
  getEngines, 
  getCarBodyId, 
  getEngineId,
  updateCar,
  deleteCar,
  createCar } = require('../../services/carsService');

router.get('/', async (req, res, next) => {
  const { params: { limit } } = req;
  
  try {
    const responceData = await getCars( limit || 5)
    logger.info(`Getting data from DB`);
      
    return res.status(200).send(responceData);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const { body } = req;
  if (isEmpty(body)) return res.sendStatus(400);

  try {
    const newCar = await createCar(body);
    logger.info(`Car - created ${newCar.id}`);
    return res.status(201).send(newCar);
  } catch (err) {
    next(err)
  }
});

router.put('/', async (req, res, next) => {
  const { body } = req;
  if (isEmpty(body)) return res.sendStatus(400);

  try {
    const updatedCar = updateCar(body);
    logger.info(`Car - updeted ${updatedCar.id}`);
    return res.status(200).send(updatedCar);
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  const deletedCount = await deleteCar(id);
  if (!deletedCount) {
    next(getError(404, `Error in DELETE Car by ${id} is not found to delete`));
  }
    
  res.sendStatus(204);
});

router.get('/details/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
  const details = await getCarDetails(id);
  res.status(200).send(details);
  } catch (err) {
    next(err);
  }
})

router.get('/types', async (req, res, next) => {
  try {
  const types = await getCarBodyTypes();
  res.status(200).send(types);
  } catch (err) {
    next(err);
  }
})

router.get('/engines', async (req, res, next) => {
  try {
  const types = await getEngines();
  res.status(200).send(types);
  } catch (err) {
    next(err);
  }
})

module.exports = router;
