import { Router } from "express";
import todosController from "./todos.controller";

const todosRouter = Router();

todosRouter.use("/", todosController);

export default todosRouter;
