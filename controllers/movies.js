const Movie = require('../models/movie');

const { ForbiddenError, NotFoundError, ServerError } = require('../classes/Error');

const addMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((card) => res.status(201).send(card))
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
        throw new NotFoundError('Фильм не найден');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав');
      }
      return Movie.findByIdAndRemove(movieId);
    })
    .then(() => {
      res.send({ message: 'фильм удален' });
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
