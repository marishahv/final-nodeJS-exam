const faker = require('faker');
const random = require('lodash/random');
const { User, Engine, CarBody, Car } = require('../../models');

const USERS_LIMIT = 3;
const ENGINES_LIMIT = 3;
const CARS_LIMIT = 5;
const CAR_BODIES_LIMIT = 5;
const IMAGES = [
  'https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?fit=crop&format=jpg&crop=4560,2565,x790,y784,safe',
  'https://ip.drivenn.ru/p56cgird7d53g_jkcytj.jpeg',
  'https://auto.vercity.ru/img/magazine/2019/12/08/1575795946.jpg',
  'https://img.avto25.ru/files/photostudio/af594f1ebefa5f2d5815e697481e0150',
  'https://s5o.ru/storage/simple/ru/edt/4f/03/e3/d2/rue2b7ea55c00.jpg'
]

const createModelData = async (model, limit, fieldsObj) => {
  let dataList = [];

  for (let i = 0; i < limit; i++) {
    let dataObj = Object.keys(fieldsObj).reduce((acc, field) => ({
      ...acc,
      [field]: fieldsObj[field]()
    }), {})

    dataList.push(dataObj); 
  }

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
      color: faker.vehicle.color(),
      speed: random(3, 100),
      image: IMAGES[i]
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
    const cars = await createCars(engines, carBodies); 
  } catch (err) {
    console.log("ERROR: ", err)
  }
}

module.exports = initDB;
