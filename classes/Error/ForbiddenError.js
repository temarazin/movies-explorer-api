const { STATUS_CODE } = require('../../utils/constants');
const { error: messages } = require('../../utils/messages');

module.exports.ForbiddenError = class ForbiddenError extends Error {
  constructor(msg = messages.forbidden.default) {
    super(msg);
    this.statusCode = STATUS_CODE.error.forbidden;
  }
};
