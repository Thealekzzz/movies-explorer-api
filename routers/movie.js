import { Router } from "express";
import { getMe } from "../controllers/user.js";
import { createMovie, deleteMovie, getMovies } from "../controllers/movie.js";
import { createMovieValidation } from "../middlewares/validations/movie.js";

const moviesRouter = Router();

moviesRouter.get('/', getMovies);
moviesRouter.post('/', createMovieValidation, createMovie);
moviesRouter.delete('/:id', deleteMovie);

export default moviesRouter;