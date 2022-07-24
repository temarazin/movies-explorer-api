const User = require('../models/user');
const { BadRequestError, NotFoundError } = require('../classes/Error');

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
  getUser,
  updateUser,
};
