const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const MSG = require('../utils/messages');
const { validation } = require('../utils/settings');

router.post('/signin', login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .$.min(validation.user.nameMinLength).max(validation.user.nameMaxLength)
      .rule({ message: MSG.validation.user.invalidNameLength }),
    email: Joi.string().email().message(MSG.validation.user.invalidEmail),
    password: Joi.string(),
  }),
}), createUser);

module.exports = router;
