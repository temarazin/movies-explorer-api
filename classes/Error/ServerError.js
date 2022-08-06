const { STATUS_CODE } = require('../../utils/constants');
const { error: messages } = require('../../utils/messages');

module.exports = class ServerError extends Error {
  constructor(msg = messages.serverError.default) {
    super(msg);
    this.statusCode = STATUS_CODE.error.serverError;
  }
};
