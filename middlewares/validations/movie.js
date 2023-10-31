import { celebrate, Joi } from 'celebrate';
import { URL_PATTERN } from '../../consts/regexs.js';

export const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(URL_PATTERN).required(),
    trailer: Joi.string().pattern(URL_PATTERN).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().pattern(URL_PATTERN).required(),
    movieId: Joi.number().required(),
  }),
});

export const registerValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
