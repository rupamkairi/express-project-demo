import { Schema, model } from "mongoose";
const { Types } = Schema;

export const postSchema = new Schema(
  {
    title: {
      type: Types.String,
    },
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

postSchema.index({ title: "text" });

const Posts = model("posts", postSchema);

export default Posts;
