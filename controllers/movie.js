import { invalidMovieCredentials, movieNotFound } from '../consts/errorMessages.js';
import { OK, USER_SIDE_ERROR } from '../consts/statuses.js';
import ForbiddenError from '../errors/ForbiddenError.js';
import NotFoundError from '../errors/NotFoundError.js';
import Movie from '../models/movie.js';

export function getMovies(req, res, next) {
  const { _id: userId } = req.user;

  Movie.find({ owner: userId })
    .then((movies) => {
      res.status(OK).send(movies);
    })
    .catch(next);
}

export async function createMovie(req, res, next) {
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

  // Проверяю, есть ли уже в базе этот фильм для текущего пользователя
  const movie = await Movie.findOne({
    $and: [{ owner: userId }, { movieId }],
  });

  if (movie) {
    res.status(USER_SIDE_ERROR).send({ message: 'Фильм уже сохранен' });
    return;
  }

  console.log({
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
  });

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
  const { _id: userId } = req.user;

  Movie.findOne({ movieId: id })
    .then(async (movie) => {
      if (!movie) {
        throw new NotFoundError(movieNotFound);
      }

      if (movie.owner !== userId) {
        throw new ForbiddenError('Удалять фильмы других пользователей запрещено');
      }

      await movie.deleteOne();

      res.status(OK).send(movie);
    })
    .catch(next);
}
