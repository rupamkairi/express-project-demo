import { Router } from "express";
import { Request } from "../../types";
import Posts from "../../models/posts";
import authValidator from "../../middlewares/authValidator";
import { Types } from "mongoose";
import roleValidator from "../../middlewares/roleValidator";

const { ObjectId } = Types;

const postsController = Router();

postsController.get("", authValidator, async (req: Request, res) => {
  try {
    let { query = "", page = 0, limit = 5 } = req.query;
    (page = +page), (limit = +limit);
    const posts = await Posts.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(null);
  }
});

postsController.post(
  "",
  authValidator,
  roleValidator,
  async (req: Request, res) => {
    try {
      let data = req.body;
      data.user = req.user?._id;
      const created = await Posts.create(data);

      res.status(200).json(created);
    } catch (error) {
      res.status(400).json(null);
    }
  }
);

postsController.get("/:id", authValidator, async (req: Request, res) => {
  try {
    const found = await Posts.findById(req.params.id).populate({
      path: "user",
      select: "name",
    });

    res.status(200).json(found);
  } catch (error) {
    res.status(400).json(null);
  }
});

postsController.put(
  "/:id",
  authValidator,
  roleValidator,
  async (req: Request, res) => {
    try {
      let data = req.body;
      const found = await Posts.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user?._id,
        },
        data,
        { new: true }
      ).populate({
        path: "user",
        select: "name",
      });

      if (!found) res.status(403).json(null);
      else {
        res.status(200).json(found);
      }
    } catch (error) {
      res.status(400).json(null);
    }
  }
);

postsController.delete(
  "/:id",
  authValidator,
  roleValidator,
  async (req: Request, res) => {
    try {
      const deleted = await Posts.findOneAndDelete({
        _id: req.params.id,
        user: req.user?._id,
      });

      if (!deleted) res.status(403).json(null);
      else {
        res.status(200).json(deleted);
      }
    } catch (error) {
      res.status(400).json(null);
    }
  }
);

postsController.get(
  "//user/:user_id",
  authValidator,
  async (req: Request, res) => {
    try {
      const found = await Posts.find({ user: req.params.user_id });

      res.status(200).json(found);
    } catch (error) {
      console.log(error);
      res.status(400).json(null);
    }
  }
);

export default postsController;
