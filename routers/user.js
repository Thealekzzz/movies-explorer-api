import { Router } from 'express';
import { getMe, patchMe } from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/me', getMe);
userRouter.patch('/me', patchMe);

export default userRouter;
