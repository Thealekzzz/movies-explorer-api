import { invalidMovieCredentials, movieNotFound } from '../consts/errorMessages.js';
import { OK } from '../consts/statuses.js';
import NotFoundError from '../errors/NotFoundError.js';
import Movie from '../models/movie.js';

export function getMovies(req, res, next) {
  Movie.find()
    .then((movies) => {
      res.status(OK).send(movies);
    })
    .catch(next);
}

export function createMovie(req, res, next) {
  const { _id: userId } = req.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: userId,
  })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(invalidMovieCredentials);
      }

      res.status(OK).send(movie);
    })
    .catch(next);
}

export function deleteMovie(req, res, next) {
  const { id } = req.params;

  Movie.findOne({ movieId: id })
    .then(async (movie) => {
      if (!movie) {
        throw new NotFoundError(movieNotFound);
      }

      await movie.deleteOne();

      res.status(OK).send(movie);
    })
    .catch(next);
}
