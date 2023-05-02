import { Schema, model } from "mongoose";
const { Types } = Schema;

export const commentSchema = new Schema(
  {
    title: {
      type: Types.String,
    },
    post: {
      type: Types.ObjectId,
      ref: "posts",
    },
    user: {
      type: Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.index({ title: "text" });

const Comments = model("comments", commentSchema);

export default Comments;
