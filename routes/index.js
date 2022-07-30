const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authRouter = require('./auth');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../classes/Error');

module.exports = (app) => {
  app.use('/', authRouter);
  app.use(auth);
  app.use('/users/', usersRouter);
  app.use('/movies/', moviesRouter);
  app.use(() => {
    throw new NotFoundError();
  });
};
