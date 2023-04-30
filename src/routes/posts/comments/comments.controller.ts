import { Router } from "express";
import authValidator from "../../../middlewares/authValidator";
import { Request } from "../../../types";
import Comments from "../../../models/comments";
import Posts from "../../../models/posts";

const commentsController = Router();

commentsController.post("", authValidator, async (req: Request, res) => {
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
});

commentsController.get("/:id", authValidator, async (req: Request, res) => {
  try {
    console.log(req.params.id);
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
});

commentsController.delete("/:id", authValidator, async (req: Request, res) => {
  try {
    const deleted = await Comments.findByIdAndDelete(req.params.id);
    const post = await Posts.findOneAndUpdate(
      { comments: req.params.id },
      { $pull: { comments: req.params.id } },
      { new: true }
    );

    res.status(200).json(deleted);
  } catch (error) {
    res.status(400).json(null);
  }
});

commentsController.get(
  "//post/:id",
  authValidator,
  async (req: Request, res) => {
    try {
      console.log(req.params.id);
      const found = await Posts.findById(req.params.id).populate({
        path: "comments",
        select: "title user",
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

export default commentsController;
