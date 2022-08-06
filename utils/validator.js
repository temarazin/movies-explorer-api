const { Joi } = require('celebrate');

const { validation } = require('./settings');
const { validation: messages } = require('./messages');

const { makeErrorMsg } = messages.common;

module.exports = {
  movie: {
    add: {
      body: Joi.object().keys({
        country: Joi.string().required().messages({
          'string.base': makeErrorMsg('country', messages.common.isNotString),
          'string.empty': makeErrorMsg('country', messages.common.isNotEmpty),
          'any.required': makeErrorMsg('country', messages.common.require),
        }),
        director: Joi.string().required().messages({
          'string.base': makeErrorMsg('director', messages.common.isNotString),
          'string.empty': makeErrorMsg('director', messages.common.isNotEmpty),
          'any.required': makeErrorMsg('director', messages.common.require),
        }),
        duration: Joi.string().required().messages({
          'string.base': makeErrorMsg('duration', messages.common.isNotString),
          'string.empty': makeErrorMsg('duration', messages.common.isNotEmpty),
          'any.required': makeErrorMsg('duration', messages.common.require),
        }),
        year: Joi.string().required().messages({
          'string.base': makeErrorMsg('year', messages.common.isNotString),
          'string.empty': makeErrorMsg('year', messages.common.isNotEmpty),
          'any.required': makeErrorMsg('year', messages.common.require),
        }),
        description: Joi.string().required().messages({
          'string.base': makeErrorMsg('description', messages.common.isNotString),
          'string.empty': makeErrorMsg('description', messages.common.isNotEmpty),
          'any.required': makeErrorMsg('description', messages.common.require),
        }),
        image: Joi.string().required().uri().messages({
          'string.base': makeErrorMsg('image', messages.common.isNotString),
          'string.empty': makeErrorMsg('image', messages.common.isNotEmpty),
          'string.uri': makeErrorMsg('image', messages.common.isNotUrl),
          'any.required': makeErrorMsg('image', messages.common.require),
        }),
        trailerLink: Joi.string().required().uri().messages({
          'string.base': makeErrorMsg('trailerLink', messages.common.isNotString),
          'string.empty': makeErrorMsg('trailerLink', messages.common.isNotEmpty),
          'string.uri': makeErrorMsg('trailerLink', messages.common.isNotUrl),
          'any.required': makeErrorMsg('trailerLink', messages.common.require),
        }),
        thumbnail: Joi.string().required().uri().messages({
          'string.base': makeErrorMsg('thumbnail', messages.common.isNotString),
          'string.empty': makeErrorMsg('thumbnail', messages.common.isNotEmpty),
          'string.uri': makeErrorMsg('thumbnail', messages.common.isNotUrl),
          'any.required': makeErrorMsg('thumbnail', messages.common.require),
        }),
        movieId: Joi.number().required().integer().messages({
          'number.base': makeErrorMsg('movieId', messages.common.isNotNumber),
          'number.integer': makeErrorMsg('movieId', messages.common.isNotInteger),
          'any.required': makeErrorMsg('movieId', messages.common.require),
        }),
        nameRU: Joi.string().required().messages({
          'string.base': makeErrorMsg('nameRU', messages.common.isNotString),
          'string.empty': makeErrorMsg('nameRU', messages.common.isNotEmpty),
          'any.required': makeErrorMsg('nameRU', messages.common.require),
        }),
        nameEN: Joi.string().required().messages({
          'string.base': makeErrorMsg('nameEN', messages.common.isNotString),
          'string.empty': makeErrorMsg('nameEN', messages.common.isNotEmpty),
          'any.required': makeErrorMsg('nameEN', messages.common.require),
        }),
      }),
    },
    delete: {
      params: Joi.object().keys({
        movieId: Joi.string().hex().message(messages.movie.invalidOwner),
      }),
    },
  },
  user: {
    update: {
      body: Joi.object().keys({
        name: Joi.string()
          .$.min(validation.user.nameMinLength).max(validation.user.nameMaxLength)
          .rule({ message: messages.user.invalidNameLength }),
        email: Joi.string().email().required().messages({
          'string.email': messages.user.invalidEmail,
          'any.required': messages.user.requireEmail,
        }),
      }),
    },
  },
  auth: {
    signUp: {
      body: Joi.object().keys({
        name: Joi.string()
          .$.min(validation.user.nameMinLength).max(validation.user.nameMaxLength)
          .rule({ message: messages.user.invalidNameLength }),
        email: Joi.string().email().required().messages({
          'string.email': messages.user.invalidEmail,
          'any.required': messages.user.requireEmail,
        }),
        password: Joi.string().required().messages({
          'any.required': messages.user.requirePassword,
        }),
      }),
    },
    signIn: {
      body: Joi.object().keys({
        email: Joi.string().email().required().messages({
          'string.email': messages.user.invalidEmail,
          'any.required': messages.user.requireEmail,
        }),
        password: Joi.string().required().messages({
          'any.required': messages.user.requirePassword,
        }),
      }),
    },
  },
};
