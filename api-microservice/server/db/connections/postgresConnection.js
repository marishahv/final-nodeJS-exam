const { Sequelize } = require('sequelize');
const dbUser = process.env.DB_POSTGRES_USER;
const dbPass = process.env.DB_POSTGRES_PASS;
const port = process.env.DB_POSTGRES_PORT;
const host = process.env.HOST;
const name = process.env.DB_POSTGRES_NAME;

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPass}@${host}:${port}/${name}`);

module.exports = sequelize;
