const { Joi } = require('celebrate');

const { validation } = require('./settings');
const { validation: messages } = require('./messages');

module.exports = {
  movie: {
    add: {},
  },
  user: {
  },
  auth: {
    signUp: {
      body: Joi.object().keys({
        name: Joi.string()
          .$.min(validation.user.nameMinLength).max(validation.user.nameMaxLength)
          .rule({ message: messages.user.invalidNameLength }),
        email: Joi.string()
          .email()
          .message(messages.user.invalidEmail)
          .required()
          .message(messages.user.requireEmail),
        password: Joi.string(),
      }),
    },
    signIn: {
      body: Joi.object().keys({
        email: Joi.string()
          .email()
          .message(messages.user.invalidEmail)
          .required()
          .message(messages.user.requireEmail),
        password: Joi.string().required().message(messages.user.requirePassword),
      }),
    },
  },
};
