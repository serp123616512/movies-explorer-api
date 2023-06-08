const express = require('express');

const { validationPostMovie, validationMovieId } = require('../middlewares/validatorsRequest/movie');

const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movie');

const movieRouter = express.Router();

movieRouter.get('/', getMovies);
movieRouter.post('/', validationPostMovie, postMovie);
movieRouter.delete('/:movieId', validationMovieId, deleteMovie);

module.exports = movieRouter;
