import { Router } from "express";
import { getMe, getUsers } from "../controllers/user.js";

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.patch('/me', getMe);

export default userRouter;