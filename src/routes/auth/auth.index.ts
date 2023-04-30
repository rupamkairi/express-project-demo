import { Router } from "express";
import authController from "./auth.controller";

const authRouter = Router();

authRouter.use("/", authController);

export default authRouter;
