import { Schema, model } from "mongoose";
const { Types } = Schema;

export const todoSchema = new Schema(
  {
    label: Types.String,
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

const Todos = model("todos", todoSchema);

export default Todos;
