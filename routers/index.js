import { Router } from 'express';

import auth from '../middlewares/auth.js';

import userRouter from './user.js';
import signRouter from './sign.js';
import moviesRouter from './movie.js';

const indexRouter = Router();

indexRouter.use('/users', auth, userRouter);
indexRouter.use('/movies', auth, moviesRouter);
indexRouter.use('/', signRouter);

indexRouter.all('*', (req, res) => {
  res.send({ message: 'Неизвестный API route' });
});

export default indexRouter;
