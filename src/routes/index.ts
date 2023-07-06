import { Router } from "express";
import subscriptionsRouter from "./subscriptions";
import productsRouter from "./products";
import paymentsRouter from "./payments";
import migrationsRouter from "./migrations";
import usersRouter from "./users";
import planRouter from "./plans";
// import usersRouter from "./users/users.index";
// import authRouter from "./auth/auth.index";
// import todosRouter from "./todos/todos.index";
// import postsRouter from "./posts/posts.index";

const indexRoute = Router();

indexRoute.get("", (req, res) => {
  res.sendStatus(200);
});

// indexRoute.use("/auth", authRouter);
// indexRoute.use("/users", usersRouter);
// indexRoute.use("/todos", todosRouter);
// indexRoute.use("/posts", postsRouter);

indexRoute.use("/migrations", migrationsRouter);

indexRoute.use("/subscriptions", subscriptionsRouter);
indexRoute.use("/plans", planRouter);
indexRoute.use("/products", productsRouter);
indexRoute.use("/payments", paymentsRouter);
indexRoute.use("/users", usersRouter);

export default indexRoute;
