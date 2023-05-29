const mongoose = require('mongoose');
const http2 = require('node:http2');
const Movie = require('../moduls/movies');

const { ValidationError } = mongoose.Error;
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => {
      res.status(http2.constants.HTTP_STATUS_OK).send(movies);
    })
    .catch(next);
};

const postMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user;

  try {
    const createdMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner,
    });
    const movie = await Movie.findById(createdMovie._id).populate('owner');
    return res.status(http2.constants.HTTP_STATUS_CREATED).send(movie);
  } catch (err) {
    if (err instanceof ValidationError) {
      if (err.errors.image) {
        return next(new BadRequestError(err.errors.image.properties.message));
      }
      if (err.errors.trailerLink) {
        return next(new BadRequestError(err.errors.trailerLink.properties.message));
      }
      if (err.errors.thumbnail) {
        return next(new BadRequestError(err.errors.thumbnail.properties.message));
      }
    }
    return next(err);
  }
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;

  Movie.findById(movieId)
    .orFail(new NotFoundError('Карточка фильма с таким id не найдена'))
    .then((movie) => {
      if (movie.owner._id.toString() !== _id) {
        throw new ForbiddenError('Недостаточно прав для удаления данной карточки фильма');
      }
      return Movie.findByIdAndRemove(movieId)
        .then(() => {
          res.status(http2.constants.HTTP_STATUS_OK).send({ message: 'Карточка удалена' });
        });
    })
    .catch(next);
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
