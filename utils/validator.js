const { Joi } = require('celebrate');

const { validation } = require('./settings');
const { validation: messages } = require('./messages');

module.exports = {
  movie: {
    add: {
      body: Joi.object().keys({
        country: Joi.string().required().message(messages.movie.requireCountry),
        director: Joi.string().required().message(messages.movie.requireDirector),
        duration: Joi.string().required().message(messages.movie.requireDuration),
        year: Joi.string().required().message(messages.movie.requireYear),
        description: Joi.string().required().message(messages.movie.requireDescription),
        image: Joi.string()
          .required()
          .message(messages.movie.requireDescription)
          .url()
          .message(messages.movie.invalidImageUrl),
        trailerLink: Joi.string()
          .required()
          .message(messages.movie.requireTrailerLink)
          .url()
          .message(messages.movie.invalidTrailerLinkUrl),
        thumbnail: Joi.string()
          .required()
          .message(messages.movie.requireThumbnail)
          .url()
          .message(messages.movie.invalidThumbnail),
        owner: Joi.string()
          .required()
          .message(messages.movie.requireOwner)
          .hex()
          .message(messages.movie.invalidOwner),
        nameRU: Joi.string().required().message(messages.movie.requireNameRU),
        nameEN: Joi.string().required().message(messages.movie.requireNameEN),
      }),
    },
    delete: {
      params: Joi.object().keys({
        movieId: Joi.string().hex().message(messages.movie.invalidOwner),
      }),
    },
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
