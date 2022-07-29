const { STATUS_CODE, MSG } = require('../utils/constants');

module.exports.errorHandler = (err, req, res, next) => {
  const {
    statusCode = STATUS_CODE.error.serverError,
    message = MSG.error.serverError.default,
  } = err;
  res.status(statusCode).send({ message });
  next();
};
