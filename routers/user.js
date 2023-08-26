import { Router } from 'express';
import { getMe, patchMe } from '../controllers/user.js';

const userRouter = Router();

userRouter.patch('/me', getMe);
userRouter.patch('/me', patchMe);

export default userRouter;
