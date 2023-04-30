import { Schema, model } from "mongoose";
const { Types } = Schema;

export const postSchema = new Schema(
  {
    title: Types.String,
    user: {
      type: Types.ObjectId,
      ref: "users",
    },
    comments: {
      type: [Types.ObjectId],
      ref: "comments",
      default: [],
    },
  },
  { timestamps: true }
);

const Posts = model("posts", postSchema);

export default Posts;
