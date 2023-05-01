import { Response, Router } from "express";
import authValidator from "../../middlewares/authValidator";
import { Request } from "../../types";
import Users from "../../models/users";
import { scopeValidator } from "../../middlewares/roleValidator";
import {
  deleteUsersAccess,
  readAllUsersAccess,
  readUsersAccess,
  updateUserAccess,
} from "./users.guard";

const usersController = Router();

usersController.get(
  "",
  authValidator,
  scopeValidator(readAllUsersAccess),
  // scopeValidator(canDoSomethingElse),
  async (req: Request, res: Response) => {
    try {
      let { query = "", page = 0, limit = 5 } = req.query;
      (page = +page), (limit = +limit);

      let filter = req.mongodb?.query?.filter;
      const users = await Users.find(filter);

      res.status(200).json(users);
    } catch (error) {
      res.status(400).json(null);
    }
  }
);

usersController.get(
  "/:id",
  authValidator,
  scopeValidator(readUsersAccess),
  async (req: Request, res: Response) => {
    try {
      let filter = req.mongodb?.query?.filter;

      console.log(filter);

      if (!filter._id) res.json(null);
      else {
        const user = await Users.findOne(filter);

        res.status(200).json(user);
      }
    } catch (error) {
      res.status(400).json(null);
    }
  }
);

usersController.put(
  "/:id",
  authValidator,
  scopeValidator(readUsersAccess),
  async (req: Request, res: Response) => {
    try {
      let filter = req.mongodb?.query?.filter;

      if (!filter._id) res.json(null);
      else {
        let data = req.body;
        const updated = await Users.findOneAndUpdate(filter, data, {
          new: true,
        });

        res.status(200).json(updated);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(null);
    }
  }
);

usersController.delete(
  "/:id",
  authValidator,
  scopeValidator(deleteUsersAccess),
  async (req: Request, res: Response) => {
    try {
      let filter = req.mongodb?.query?.filter;

      if (!filter._id) res.json(null);
      else {
        const deleted = await Users.findOneAndDelete(filter);

        res.status(200).json(deleted);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(null);
    }
  }
);

usersController.get("/me", authValidator, async (req: Request, res) => {
  try {
    const user = await Users.findById(req.user?._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(null);
  }
});

export default usersController;
