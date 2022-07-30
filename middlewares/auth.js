const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../classes/Error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  let { jwt: token } = req.cookies;
  if (!token || !token.startWith('Bearer ')) {
    return next(new UnauthorizedError());
  }

  token = token.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError());
  }

  req.user = payload;

  return next();
};
