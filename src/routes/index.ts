import { Router } from "express";
import usersRouter from "./users/users.index";
import authRouter from "./auth/auth.index";
import todosRouter from "./todos/todos.index";
import postsRouter from "./posts/posts.index";

const indexRoute = Router();

indexRoute.get("", (req, res) => {
  res.sendStatus(200);
});

indexRoute.use("/auth", authRouter);
indexRoute.use("/users", usersRouter);
indexRoute.use("/todos", todosRouter);
indexRoute.use("/posts", postsRouter);

export default indexRoute;
