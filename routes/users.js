const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser, createUser } = require('../controllers/users');
const MSG = require('../utils/messages');
const { validation } = require('../utils/settings');

// temp route
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .$.min(validation.user.nameMinLength).max(validation.user.nameMaxLength)
      .rule({ message: MSG.validation.user.invalidNameLength }),
    email: Joi.string().email().message(MSG.validation.user.invalidEmail),
    password: Joi.string(),
  }),
}), createUser);

router.get('/me', getUser);
router.patch('/me', updateUser);

module.exports = router;
