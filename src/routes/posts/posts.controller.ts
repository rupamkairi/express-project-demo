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
import { accessError, resourceError } from "../../constants/errors";

const postsController = Router();

postsController.get(
  "",
  authValidator,
  scopeValidator(readAllPostsAccess),
  async (req: Request, res) => {
    try {
      let { query = "", page = 1, limit = 5 } = req.query;
      (page = +page), (limit = +limit);

      let filter = req.mongodb?.query?.filter;
      if (query) filter = { ...filter, $text: { $search: query } };
      const posts = await Posts.find(filter)
        .sort({ createdAt: 1 })
        .limit(limit)
        .skip(limit * (page - 1));

      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json(error);
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
    res.status(400).json(error);
  }
});

postsController.get(
  "/:id",
  authValidator,
  scopeValidator(readPostAccess),
  async (req: Request, res) => {
    try {
      let filter = req.mongodb?.query?.filter;

      if (!filter._id) res.status(404).json(resourceError.notFound("Post"));
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

        if (!found) res.status(404).json(resourceError.notFound("Post"));
        else {
          res.status(200).json(found);
        }
      }
    } catch (error) {
      res.status(400).json(error);
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

      if (!filter._id || !filter.user)
        res.status(404).json(resourceError.notFound("Post"));
      else {
        let data = req.body;
        const updated = await Posts.findOneAndUpdate(filter, data, {
          new: true,
        });

        if (!updated) res.status(403).json(accessError.forbidden());
        else {
          res.status(200).json(updated);
        }
      }
    } catch (error) {
      res.status(400).json(error);
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

      if (!filter._id || !filter.user)
        res.status(404).json(resourceError.notFound("Post"));
      else {
        const deleted = await Posts.findOneAndDelete(filter);

        if (!deleted) res.status(403).json(accessError.forbidden());
        else {
          res.status(200).json(deleted);
        }
      }
    } catch (error) {
      res.status(400).json(error);
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
      let { query = "", page = 1, limit = 5 } = req.query;
      (page = +page), (limit = +limit);

      let filter = req.mongodb?.query?.filter;
      if (query)
        filter = {
          ...filter,
          user: req.params.user_id,
          $text: { $search: query },
        };
      const found = await Posts.find(filter)
        .sort({ createdAt: 1 })
        .limit(limit)
        .skip(limit * (page - 1));

      res.status(200).json(found);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

export default postsController;
