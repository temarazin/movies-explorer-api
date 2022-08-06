const { STATUS_CODE } = require('../../utils/constants');
const { error: messages } = require('../../utils/messages');

module.exports.BadRequestError = class BadRequestError extends Error {
  constructor(msg = messages.badRequest.default) {
    super(msg);
    this.statusCode = STATUS_CODE.error.badRequest;
  }
};
