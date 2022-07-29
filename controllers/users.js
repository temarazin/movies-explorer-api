const bcrypt = require('bcrypt');

const User = require('../models/user');
const { BadRequestError, NotFoundError, ConflictError } = require('../classes/Error');
const { STATUS_CODE, ERROR_CODE, MSG } = require('../utils/constants');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(STATUS_CODE.success.created).send(
        { name: user.name, email: user.email },
      );
    })
    .catch((err) => {
      if (err.code === ERROR_CODE.mongo.duplicateKey) {
        next(new ConflictError(MSG.error.conflict.emailAlreadyExist));
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
        throw new NotFoundError(MSG.error.notFound.user);
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
          next(new NotFoundError(MSG.error.notFound.user));
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
