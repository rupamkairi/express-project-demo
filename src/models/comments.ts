import { Schema, model } from "mongoose";
const { Types } = Schema;

export const commentSchema = new Schema(
  {
    title: Types.String,
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

const Comments = model("comments", commentSchema);

export default Comments;
