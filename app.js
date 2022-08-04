require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

const router = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { dbConnect } = require('./utils/settings');
const rateLimiter = require('./utils/rateLimitConfig');

const app = express();

app.use(helmet());
app.use(rateLimiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbConnect.dbHost + dbConnect.dbName);

app.use(cookieParser());
app.use(requestLogger);

router(app);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

module.exports = app;
