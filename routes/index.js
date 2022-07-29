const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { NotFoundError } = require('../classes/Error');

module.exports = (app) => {
  app.use('/users/', usersRouter);
  app.use('/movies/', moviesRouter);
  app.use(() => {
    throw new NotFoundError('Неверный путь');
  });
};
