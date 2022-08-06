const { STATUS_CODE } = require('../../utils/constants');
const { error: messages } = require('../../utils/messages');

module.exports = class NotFoundError extends Error {
  constructor(msg = messages.notFound.default) {
    super(msg);
    this.statusCode = STATUS_CODE.error.notFound;
  }
};
