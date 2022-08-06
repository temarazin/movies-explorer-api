const BadRequestError = require('./Error/BadRequestError');
const ConflictError = require('./Error/ConflictError');
const ForbiddenError = require('./Error/ForbiddenError');
const NotFoundError = require('./Error/NotFoundError');
const ServerError = require('./Error/ServerError');
const UnauthorizedError = require('./Error/UnauthorizedError');

module.exports = {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
};
