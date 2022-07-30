const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../classes/Error');

const { NODE_ENV, JWT_SECRET } = process.env;
const SETTINGS = require('../utils/settings');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!token) {
    return next(new UnauthorizedError());
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SETTINGS.commonSettings.developSecretKey);
  } catch (err) {
    return next(new UnauthorizedError());
  }

  req.user = payload;

  return next();
};
