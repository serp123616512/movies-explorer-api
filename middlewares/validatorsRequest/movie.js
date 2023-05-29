const { celebrate, Joi } = require('celebrate');
const URL = require('../../utils/constants');

const validationPostMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(URL),
    trailerLink: Joi.string().required().regex(URL),
    thumbnail: Joi.string().required().regex(URL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validationMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validationPostMovie,
  validationMovieId,
};
