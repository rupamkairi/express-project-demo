import { Router } from "express";
import { Request } from "../../types";
import Posts from "../../models/posts";
import authValidator from "../../middlewares/authValidator";
import { scopeValidator } from "../../middlewares/roleValidator";
import {
  deletePostAccess,
  readAllPostsAccess,
  readPostAccess,
  updatePostAccess,
} from "./posts.guard";

const postsController = Router();

postsController.get(
  "",
  authValidator,
  scopeValidator(readAllPostsAccess),
  async (req: Request, res) => {
    try {
      let { query = "", page = 0, limit = 5 } = req.query;
      (page = +page), (limit = +limit);

      let filter = req.mongodb?.query?.filter;
      const posts = await Posts.find(filter);

      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json(null);
    }
  }
);

postsController.post("", authValidator, async (req: Request, res) => {
  try {
    let data = req.body;
    data.user = req.user?._id;

    const created = await Posts.create(data);

    res.status(200).json(created);
  } catch (error) {
    res.status(400).json(null);
  }
});

postsController.get(
  "/:id",
  authValidator,
  scopeValidator(readPostAccess),
  async (req: Request, res) => {
    try {
      let filter = req.mongodb?.query?.filter;

      if (!filter._id) res.status(404).json(null);
      else {
        const found = await Posts.findOne(filter)
          .populate({
            path: "user",
            select: "name",
          })
          .populate({
            path: "comments",
            select: "title user",
            populate: {
              path: "user",
              select: "name",
            },
          });

        if (!found) res.status(404).json(null);
        else {
          res.status(200).json(found);
        }
      }
    } catch (error) {
      res.status(400).json(null);
    }
  }
);

postsController.put(
  "/:id",
  authValidator,
  scopeValidator(updatePostAccess),
  async (req: Request, res) => {
    try {
      let filter = req.mongodb?.query?.filter;

      if (!filter._id || !filter.user) res.status(404).json(null);
      else {
        let data = req.body;
        const updated = await Posts.findOneAndUpdate(filter, data, {
          new: true,
        }).populate({
          path: "user",
          select: "name",
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

postsController.delete(
  "/:id",
  authValidator,
  scopeValidator(deletePostAccess),
  async (req: Request, res) => {
    try {
      let filter = req.mongodb?.query?.filter;

      if (!filter._id || !filter.user) res.status(404).json(null);
      else {
        const deleted = await Posts.findOneAndDelete(filter);

        if (!deleted) res.status(403).json(null);
        else {
          res.status(200).json(deleted);
        }
      }
    } catch (error) {
      res.status(400).json(null);
    }
  }
);

// post by user id
postsController.get(
  "//user/:user_id",
  authValidator,
  scopeValidator(readAllPostsAccess),
  async (req: Request, res) => {
    try {
      const found = await Posts.find({ user: req.params.user_id }).populate({
        path: "comments",
        select: "title user",
        populate: {
          path: "user",
          select: "name",
        },
      });

      res.status(200).json(found);
    } catch (error) {
      console.log(error);
      res.status(400).json(null);
    }
  }
);

export default postsController;
