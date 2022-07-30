/* eslint-disable max-classes-per-file */

const { STATUS_CODE } = require('../utils/constants');
const { error: messages } = require('../utils/messages');

module.exports.BadRequestError = class BadRequestError extends Error {
  constructor(msg = messages.badRequest.default) {
    super(msg);
    this.statusCode = STATUS_CODE.error.badRequest;
  }
};

module.exports.UnauthorizedError = class UnauthorizedError extends Error {
  constructor(msg = messages.unauthorized.default) {
    super(msg);
    this.statusCode = STATUS_CODE.error.unauthorized;
  }
};

module.exports.ForbiddenError = class ForbiddenError extends Error {
  constructor(msg = messages.forbidden.default) {
    super(msg);
    this.statusCode = STATUS_CODE.error.forbidden;
  }
};

module.exports.NotFoundError = class NotFoundError extends Error {
  constructor(msg = messages.notFound.default) {
    super(msg);
    this.statusCode = STATUS_CODE.error.notFound;
  }
};

module.exports.ConflictError = class ConflictError extends Error {
  constructor(msg = messages.conflict.default) {
    super(msg);
    this.statusCode = STATUS_CODE.error.conflict;
  }
};

module.exports.ServerError = class ServerError extends Error {
  constructor(msg = messages.serverError.default) {
    super(msg);
    this.statusCode = STATUS_CODE.error.serverError;
  }
};
