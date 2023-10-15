import { Router } from 'express';
import { getMe, patchMe } from '../controllers/user.js';
import patchMeValidation from '../middlewares/validations/user.js';

const userRouter = Router();

userRouter.get('/me', getMe);
userRouter.patch('/me', patchMeValidation, patchMe);

export default userRouter;
