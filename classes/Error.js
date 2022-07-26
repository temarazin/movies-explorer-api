/* eslint-disable max-classes-per-file */

const { STATUS_CODE } = require('../utils/constants');

module.exports.BadRequestError = class BadRequestError extends Error {
  constructor(msg = 'Некорректные данные в запросе') {
    super(msg);
    this.statusCode = STATUS_CODE.error.badRequest;
  }
};

module.exports.UnauthorizedError = class UnauthorizedError extends Error {
  constructor(msg = 'Необходима авторизация') {
    super(msg);
    this.statusCode = STATUS_CODE.error.unauthorized;
  }
};

module.exports.ForbiddenError = class ForbiddenError extends Error {
  constructor(msg = 'Доступ запрещен') {
    super(msg);
    this.statusCode = STATUS_CODE.error.forbidden;
  }
};

module.exports.NotFoundError = class NotFoundError extends Error {
  constructor(msg = 'Ничего не найдено') {
    super(msg);
    this.statusCode = STATUS_CODE.error.notFound;
  }
};

module.exports.ConflictError = class ConflictError extends Error {
  constructor(msg = 'Запрос не может быть исполнен') {
    super(msg);
    this.statusCode = STATUS_CODE.error.conflict;
  }
};

module.exports.ServerError = class ServerError extends Error {
  constructor(msg = 'Что-то пошло не так') {
    super(msg);
    this.statusCode = STATUS_CODE.error.serverError;
  }
};
