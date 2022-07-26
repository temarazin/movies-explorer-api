const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use((req, res, next) => {
  req.user = { _id: '62dd1d0bcd9d20ccdac599ee' };
  next();
});

router(app);

app.listen(3000);
