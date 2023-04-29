import { Router } from "express";
import userRouter from "./users/users.index";

const indexRoute = Router();

indexRoute.get("", (req, res) => {
  res.sendStatus(200);
});

indexRoute.use("/users", userRouter);

export default indexRoute;
