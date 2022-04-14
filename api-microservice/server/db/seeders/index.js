const faker = require('faker');
const random = require('lodash/random');
const { User, Engine, CarBody, Car } = require('../../models');

const USERS_LIMIT = 3;
const ENGINES_LIMIT = 3;
const CARS_LIMIT = 5;
const CAR_BODIES_LIMIT = 5;

const createModelData = async (model, limit, fieldsObj) => {
  let dataList = [];

  for (let i = 0; i < limit; i++) {
    let dataObj = Object.keys(fieldsObj).reduce((acc, field) => ({
      ...acc,
      [field]: fieldsObj[field]()
    }), {})

    dataList.push(dataObj);
  }

  await model.sync({force: true});
  return await model.bulkCreate(dataList);
}

const createUsers = async () => {
  const fieldsObj = {
    email: faker.internet.email,
    username: faker.random.word,
    password: faker.internet.password
  };

  return await createModelData(User, USERS_LIMIT, fieldsObj);
}

const createEngines = async () => {
  const fieldsObj = {
    power: () => random(80, 150)
  };

  return await createModelData(Engine, ENGINES_LIMIT, fieldsObj);
}

const createCarBodies = async () => {
  const fieldsObj = {
    type: faker.vehicle.model,
  };

  return await createModelData(CarBody, CAR_BODIES_LIMIT, fieldsObj);
}

const createCars = async (engines = [], carBodies = []) => {
  const enginesIds = engines.map(({ id }) => id);

  const carBodiesIds = carBodies.map(({ id }) => id);
  const carsData = [];

  for (let i = 0; i < CARS_LIMIT; i++) {
    const fieldsObj = {
      engine_id: enginesIds[random(enginesIds.length - 1)],
      carbody_id: carBodiesIds[random(carBodiesIds.length - 1)],
      color: faker.vehicle.color()
    };
    
    carsData.push(fieldsObj); 
  }
  await Car.bulkCreate(carsData);
}

const initDB = async () => {
  try { 
    await createUsers(); 
    const engines = await createEngines();
    const carBodies = await createCarBodies();
    const cars = await createCars(); 
  } catch (err) {
    console.log("ERROR: ", err) 
  }
}

module.exports = initDB;
