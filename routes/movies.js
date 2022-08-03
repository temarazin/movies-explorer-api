const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { movie: movieValidator } = require('../utils/validator');

router.get('/', getMovies);
router.post('/', celebrate(movieValidator.add), addMovie);
router.delete('/:movieId', celebrate(movieValidator.delete), deleteMovie);

module.exports = router;
