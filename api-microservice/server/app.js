require('dotenv').config();
// const config = require('config');
const cookieParser = require('cookie-parser')
const { sequelize } = require('./db');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors')
const apiRouter = require('./api');
const initDB = require('./db/seeders');
const errorHandler = require('./middlewares/errorHandler');

var app = express();
const port = process.env.PORT;
const host = process.env.HOST;

// (async() => { 
//     try {
//     await sequelize.authenticate(); 
//     await sequelize.sync({ force: true });

//     await initDB();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })(); 
 
app.use(morgan('dev'));

const corsOptions = {
  origin: "http://localhost:3000",  // Configures the Access-Control-Allow-Origin CORS header
  methods: "PUT,POST,GET,DELETE"    // Configures the Access-Control-Allow-Methods CORS header for OPTIONS method
}

// app.use(cors());
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening at http://${host}:${port}`));

module.exports = app;
