const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser, createUser } = require('../controllers/users');

// temp route
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().$.min(2).max(30).rule({ message: 'Имя должно содержать от 2 до 30 символов' }),
    email: Joi.string().email().message('Некорректный E-mail'),
    password: Joi.string(),
  }),
}), createUser);

router.get('/me', getUser);
router.patch('/me', updateUser);

module.exports = router;
