import { Router } from "express";
import postsController from "./posts.controller";
import commentsRouter from "./comments/comments.index";

const postsRouter = Router();

postsRouter.use("/", postsController);

postsRouter.use("/comments", commentsRouter);

export default postsRouter;
