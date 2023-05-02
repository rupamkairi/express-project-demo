import { Schema, model } from "mongoose";
const { Types } = Schema;

export const todoSchema = new Schema(
  {
    label: {
      type: Types.String,
      // index: "text",
    },
    completed: {
      type: Types.Boolean,
      default: false,
    },
    removed: {
      type: Types.Boolean,
      default: false,
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

todoSchema.index({ label: "text" });

const Todos = model("todos", todoSchema);

export default Todos;
