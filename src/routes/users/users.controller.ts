import { Response, Router } from "express";
import authValidator from "../../middlewares/authValidator";
import { Request } from "../../types";
import Users from "../../models/users";
import { scopeValidator } from "../../middlewares/roleValidator";
import {
  deleteUserAccess,
  readAllUsersAccess,
  readUserAccess,
  updateUserAccess,
} from "./users.guard";
import { accessError } from "../../constants/errors";

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
      res.status(400).json(error);
    }
  }
);

usersController.get(
  "/:id",
  authValidator,
  scopeValidator(readUserAccess),
  async (req: Request, res: Response) => {
    try {
      let filter = req.mongodb?.query?.filter;

      if (!filter._id) res.json(accessError.forbidden());
      else {
        const user = await Users.findOne(filter);

        res.status(200).json(user);
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

usersController.put(
  "/:id",
  authValidator,
  scopeValidator(updateUserAccess),
  async (req: Request, res: Response) => {
    try {
      let filter = req.mongodb?.query?.filter;

      if (!filter._id) res.json(accessError.forbidden());
      else {
        let data = req.body;
        const updated = await Users.findOneAndUpdate(filter, data, {
          new: true,
        });

        res.status(200).json(updated);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
);

usersController.delete(
  "/:id",
  authValidator,
  scopeValidator(deleteUserAccess),
  async (req: Request, res: Response) => {
    try {
      let filter = req.mongodb?.query?.filter;

      if (!filter._id) res.json(accessError.forbidden());
      else {
        const deleted = await Users.findOneAndDelete(filter);

        res.status(200).json(deleted);
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

usersController.get("/me", authValidator, async (req: Request, res) => {
  try {
    const user = await Users.findById(req.user?._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default usersController;
