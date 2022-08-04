const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require('../classes/Error');

const { NODE_ENV, JWT_SECRET } = process.env;
const { STATUS_CODE, ERROR_CODE } = require('../utils/constants');
const MSG = require('../utils/messages');
const SETTINGS = require('../utils/settings');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(STATUS_CODE.success.created).send(
        { _id: user._id, name: user.name, email: user.email },
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

const login = (req, res, next) => {
  const { email, password } = req.body;
  let dbUser;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(MSG.error.unauthorized.cantAuth);
      }
      dbUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new UnauthorizedError(MSG.error.unauthorized.cantAuth);
      }
      const token = jwt.sign(
        { _id: dbUser._id },
        NODE_ENV === 'production' ? JWT_SECRET : SETTINGS.commonSettings.developSecretKey,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
        })
        .end();
    })
    .catch(next);
};

const logout = (req, res, next) => {
  res
    .clearCookie('jwt', {
      httpOnly: true,
    })
    .end();
  next();
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  login,
  logout,
};
