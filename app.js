const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const router = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/moviesdb');

// app.use((req, res, next) => {
//   req.user = { _id: '62dd1d0bcd9d20ccdac599ee' };
//   next();
// });

app.use(cookieParser());

router(app);

app.use(errors());
app.use(errorHandler);

module.exports = app;
