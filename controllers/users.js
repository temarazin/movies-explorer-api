const bcrypt = require('bcrypt');

const User = require('../models/user');
const { BadRequestError, NotFoundError, ConflictError } = require('../classes/Error');
const { STATUS_CODE, ERROR_CODE } = require('../utils/constants');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      });
    })
    .then((user) => {
      res.status(STATUS_CODE.success.created).send(
        { name: user.name, email: user.email },
      );
    })
    .catch((err) => {
      if (err.code === ERROR_CODE.mongo.duplicateKey) {
        const msg = 'Пользователь с таким E-mail уже существует';
        next(new ConflictError(msg));
      } else {
        next(err);
      }
    });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError('Пользователь не найден');
      }
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  if (email && name) {
    User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { runValidator: true, new: true },
      (err, docs) => {
        if (err) {
          next(err);
        } else if (!docs) {
          const msg = 'Пользователь не найден';
          next(new NotFoundError(msg));
        } else {
          res.send(docs);
        }
      },
    );
  } else {
    next(new BadRequestError());
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
};
