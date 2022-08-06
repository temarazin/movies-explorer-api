const { STATUS_CODE } = require('../../utils/constants');
const { error: messages } = require('../../utils/messages');

module.exports = class UnauthorizedError extends Error {
  constructor(msg = messages.unauthorized.default) {
    super(msg);
    this.statusCode = STATUS_CODE.error.unauthorized;
  }
};
