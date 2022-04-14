const { Engine, CarBody, Car} = require('../models');
const logger = require('../logger');
const { getCache, setCache, deleteCache } = require('../db/cache');

const getCars = async (limit) => {
  const carsData = await Car.findAll({
      include: [
        {
          model: CarBody, 
          attributes: ['type'], 
          required: false, 
        },
        {
          model: Engine, 
          attributes: ['power'], 
          required: false, 
        },
      ],
      limit: limit
    });

  return carsData;
}

const getCarDetails = async (carId) => {
  let carData;
  const cache = await getCache(carId);
    
  if (cache) {
    logger.info(`Getting data from redis by carId ${carId}`);
      
    return JSON.parse(cache);
  } else {
      carData = await Car.findOne({
        include: [
          {
            model: CarBody, 
            attributes: ['type'], 
            required: false, 
          },
          {
            model: Engine, 
            attributes: ['power'], 
            required: false, 
          },
        ],
        where: { id: carId }
      });
      logger.info(`Getting data from DB by carId ${carId}`);
      setCache(carId, JSON.stringify(carData));

    }

  return carData;
}

const getCarBodyTypes = async () => {
  const cache = await getCache('carBody');

  if (cache) {
    logger.info('Get carBody data from cache');
    return JSON.parse(cache);
  }

  logger.info('Get carBody data from DB');
  return await CarBody.findAll();
}

const getEngines = async () => {
  const cache = await getCache('engine');

  if (cache) {
    logger.info('Get Engine data from cache');
    return JSON.parse(cache);
  }
  logger.info('Get Engine data from DB');
  return await Engine.findAll();
}

const getCarBodyId = async (type) => {
  const { id } = await CarBody.findOne({
    where: { type: type }
  });
  return id;
}

const getEngineId = async (power) => {
  const { id } = await Engine.findOne({
    where: { power: power }
  });
  return id;
}

const createCar = async (body) => {
  const { color, speed, image, carBody, power} = body;
  const carBodyId = await getCarBodyId(carBody);
  const engineId = await getEngineId(power);
  
  const newCar = await Car.create({ 
    engine_id: engineId,
    carbody_id: carBodyId,
    color,
    speed,
    image
  });

  return newCar;
}

const updateCar = async (body) => {
  let carBodyId;
  let engineId;

  const { id, color, speed, image, carBody, power} = body;

  if(carBody) {
    carBodyId = await getCarBodyId(carBody);
  }
  if (power) {
    engineId = await getEngineId(power);
  }
    
  const updatedCar = await Car.update({ 
    engine_id: engineId,
    carbody_id: carBodyId,
    color,
    speed,
    image
    }, 
    { 
      where: { id } 
    });

    const cache = await getCache(id);
    if (cache) deleteCache(id);

  return updatedCar;
}

const deleteCar = async (id) => {
  const deletedCount = await Car.destroy({ where: { id }});
  const cache = await getCache(id);

  if (cache) deleteCache(id);

  return deletedCount;
}

module.exports = { 
  getCars, 
  getCarDetails, 
  getCarBodyTypes, 
  getEngines, 
  getCarBodyId, 
  getEngineId,
  createCar,
  updateCar,
  deleteCar
};
