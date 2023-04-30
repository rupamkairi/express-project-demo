import { Router } from "express";
import usersController from "./users.controller";

const usersRouter = Router();

usersRouter.use("/", usersController);

export default usersRouter;
