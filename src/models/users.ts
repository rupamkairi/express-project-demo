import { Schema, model } from "mongoose";
import { roles } from "../roles";
const { Types } = Schema;

export const userSchema = new Schema(
  {
    name: Types.String,
    email: Types.String,
    password: Types.String,
    roles: {
      type: [Types.String],
      enum: [roles.admin, roles.user],
      default: [roles.user],
    },
  },
  {
    timestamps: true,
  }
);

const Users = model("users", userSchema);

export default Users;
