const { STATUS_CODE } = require('../../utils/constants');
const { error: messages } = require('../../utils/messages');

module.exports.ConflictError = class ConflictError extends Error {
  constructor(msg = messages.conflict.default) {
    super(msg);
    this.statusCode = STATUS_CODE.error.conflict;
  }
};
