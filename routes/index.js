const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../classes/Error');

module.exports = (app) => {
  app.use(auth);
  app.use('/users/', usersRouter);
  app.use('/movies/', moviesRouter);
  app.use(() => {
    throw new NotFoundError();
  });
};
