import { Router } from "express";
import { Request } from "../../types";
import Todos from "../../models/todos";
import authValidator from "../../middlewares/authValidator";

const todosController = Router();

todosController.get("", authValidator, async (req: Request, res) => {
  try {
    let { query = "", page = 0, limit = 5 } = req.query;
    (page = +page), (limit = +limit);
    const todos = await Todos.find();

    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json(null);
  }
});

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

todosController.get("/:id", authValidator, async (req: Request, res) => {
  try {
    const found = await Todos.findById(req.params.id).populate({
      path: "user",
      select: "name",
    });

    res.status(200).json(found);
  } catch (error) {
    console.log(error);
    res.status(400).json(null);
  }
});

todosController.get(
  "//user/:user_id",
  authValidator,
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

todosController.put("/:id", authValidator, async (req: Request, res) => {
  try {
    let data = req.body;
    const updated = await Todos.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json(null);
  }
});

todosController.delete("/:id", authValidator, async (req: Request, res) => {
  try {
    const deleted = await Todos.findByIdAndDelete(req.params.id);

    res.status(200).json(deleted);
  } catch (error) {
    res.status(400).json(null);
  }
});

export default todosController;
