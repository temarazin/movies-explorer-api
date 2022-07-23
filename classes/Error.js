/* eslint-disable max-classes-per-file */

const { STATUS_CODE } = require('../utils/constants');

module.exports.BadRequestError = class BadRequestError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = STATUS_CODE.error.badRequest;
  }
};

module.exports.UnauthorizedError = class UnauthorizedError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = STATUS_CODE.error.unauthorized;
  }
};

module.exports.ForbiddenError = class ForbiddenError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = STATUS_CODE.error.forbidden;
  }
};

module.exports.NotFoundError = class NotFoundError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = STATUS_CODE.error.notFound;
  }
};

module.exports.ConflictError = class ConflictError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = STATUS_CODE.error.conflict;
  }
};
