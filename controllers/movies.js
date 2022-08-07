const Movie = require('../models/movie');

const { ForbiddenError, NotFoundError, ServerError } = require('../classes/Error');
const { STATUS_CODE } = require('../utils/constants');
const MSG = require('../utils/messages');

const addMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(STATUS_CODE.success.created).send(movie))
    .catch(next);
};

const getMovies = (req, res, next) => {
  if (!req.user._id) {
    next(new ServerError());
    return;
  }
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MSG.error.notFound.movie);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError();
      }
      return Movie.findByIdAndRemove(movieId);
    })
    .then(() => {
      res.send({ message: MSG.success.movieWasRemoved });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  addMovie,
  getMovies,
  deleteMovie,
};
