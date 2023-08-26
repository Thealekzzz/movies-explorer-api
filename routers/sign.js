import { Router } from 'express';
import { login, register, signout } from '../controllers/sign.js';
import { loginValidation, registerValidation } from '../middlewares/validations/user.js';

const signRouter = Router();

signRouter.post('/signin', loginValidation, login);
signRouter.post('/signup', registerValidation, register);
signRouter.post('/signout', signout);

export default signRouter;
