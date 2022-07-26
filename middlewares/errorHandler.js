module.exports.errorHandler = (err, req, res, next) => {
  const {
    statusCode = 500,
    message = 'Что-то пошло не так',
  } = err;
  res.status(statusCode).send({ message });
  next();
};
