import { Router } from "express";
import authValidator from "../../../middlewares/authValidator";
import { Request } from "../../../types";
import Comments from "../../../models/comments";
import Posts from "../../../models/posts";
import { scopeValidator } from "../../../middlewares/roleValidator";
import {
  createCommentAccess,
  deleteCommentAccess,
  readCommentAccess,
} from "./comments.guard";

const commentsController = Router();

commentsController.post(
  "",
  authValidator,
  scopeValidator(createCommentAccess),
  async (req: Request, res) => {
    try {
      let data = req.body;
      data.user = req.user?._id;

      const created = await Comments.create(data);
      await Posts.findByIdAndUpdate(data.post, {
        $addToSet: { comments: created._id },
      });

      res.status(200).json(created);
    } catch (error) {
      res.status(400).json(null);
    }
  }
);

commentsController.get(
  "/:id",
  authValidator,
  scopeValidator(readCommentAccess),
  async (req: Request, res) => {
    try {
      const found = await Comments.findById(req.params.id).populate({
        path: "post",
        select: "-comments user",
        populate: {
          path: "user",
          select: "name",
        },
      });

      res.status(200).json(found);
    } catch (error) {
      res.status(400).json(null);
    }
  }
);

commentsController.delete(
  "/:id",
  authValidator,
  scopeValidator(deleteCommentAccess),
  async (req: Request, res) => {
    try {
      let filter = req.mongodb?.query?.filter;

      if (!filter._id || !filter.user) res.status(404).json(null);
      else {
        const deleted = await Comments.findOneAndDelete(filter);

        if (!deleted) res.status(403).json(null);
        else {
          const post = await Posts.findOneAndUpdate(
            { comments: req.params.id },
            { $pull: { comments: req.params.id } },
            { new: true }
          );

          res.status(200).json(deleted);
        }
      }
    } catch (error) {
      res.status(400).json(null);
    }
  }
);

export default commentsController;
