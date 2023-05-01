import { Router } from "express";
import { Request } from "../../types";
import Todos from "../../models/todos";
import authValidator from "../../middlewares/authValidator";
import { scopeValidator } from "../../middlewares/roleValidator";
import {
  readAllTodosAccess,
  readTodoAccess,
  updateTodoAccess,
} from "./todos.guard";

const todosController = Router();

todosController.get(
  "",
  authValidator,
  scopeValidator(readAllTodosAccess),
  async (req: Request, res) => {
    try {
      let { query = "", page = 0, limit = 5 } = req.query;
      (page = +page), (limit = +limit);

      let filter = req.mongodb?.query?.filter;
      const todos = await Todos.find(filter);

      res.status(200).json(todos);
    } catch (error) {
      res.status(400).json(null);
    }
  }
);

todosController.post("", authValidator, async (req: Request, res) => {
  try {
    let data = req.body;
    data.user = req.user?._id;
    const created = await Todos.create(data);

    res.status(200).json(created);
  } catch (error) {
    res.status(400).json(null);
  }
});

todosController.get(
  "/:id",
  authValidator,
  scopeValidator(readTodoAccess),
  async (req: Request, res) => {
    try {
      let filter = req.mongodb?.query?.filter;

      if (!filter._id) res.status(404).json(null);
      else {
        const found = await Todos.findOne(filter).populate({
          path: "user",
          select: "name",
        });

        if (!found) res.status(404).json(null);
        else {
          res.status(200).json(found);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(null);
    }
  }
);

todosController.put(
  "/:id",
  authValidator,
  scopeValidator(updateTodoAccess),
  async (req: Request, res) => {
    try {
      let filter = req.mongodb?.query?.filter;

      if (!filter._id || !filter.user) res.status(404).json(null);
      else {
        let data = req.body;
        const updated = await Todos.findOneAndUpdate(filter, data, {
          new: true,
        });

        if (!updated) res.status(403).json(null);
        else {
          res.status(200).json(updated);
        }
      }
    } catch (error) {
      res.status(400).json(null);
    }
  }
);

todosController.delete("/:id", authValidator, async (req: Request, res) => {
  try {
    let filter = req.mongodb?.query?.filter;

    if (!filter._id || !filter.user) res.status(404).json(null);
    else {
      const deleted = await Todos.findOneAndDelete(filter);

      if (!deleted) res.status(403).json(null);
      else {
        res.status(200).json(deleted);
      }
    }
  } catch (error) {
    res.status(400).json(null);
  }
});

todosController.get(
  "//user/:user_id",
  authValidator,
  scopeValidator(readAllTodosAccess),
  async (req: Request, res) => {
    try {
      const found = await Todos.find({ user: req.params.user_id });

      res.status(200).json(found);
    } catch (error) {
      console.log(error);
      res.status(400).json(null);
    }
  }
);
export default todosController;
