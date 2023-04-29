import { Router } from "express";
import userController from "./users.controller";

const userRouter = Router();

userRouter.use("/", userController);

export default userRouter;
