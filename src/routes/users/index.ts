import { Router } from "express";
import User from "../../models/User";

const usersRouter = Router();

usersRouter.get("", async (req, res) => {
  try {
    let allUsers = await User.findAll({
      include: ["subscription"],
    });
    return res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

usersRouter.post("", async (req, res) => {
  try {
    let newUser = new User();
    let savedUser = await newUser.save();
    return res.status(201).json(savedUser.toJSON());
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

export default usersRouter;
