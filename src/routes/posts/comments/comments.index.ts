import { Router } from "express";
import commentsController from "./comments.controller";

const commentsRouter = Router();

commentsRouter.use("/", commentsController);

export default commentsRouter;
