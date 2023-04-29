import { Router } from "express";

const userController = Router();

userController.get("/me", (req, res) => {
  res.sendStatus(200);
});

export default userController;
