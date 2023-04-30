import { Router } from "express";
import authValidator from "../../middlewares/authValidator";
import { Request } from "../../types";
import Users from "../../models/users";

const usersController = Router();

usersController.get("/me", authValidator, async (req: Request, res) => {
  try {
    const user = await Users.findById(req.user?._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(null);
  }
});

export default usersController;
