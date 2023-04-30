import { Schema, model } from "mongoose";
const { Types } = Schema;

export const userSchema = new Schema(
  {
    name: Types.String,
    email: Types.String,
    password: Types.String,
  },
  {
    timestamps: true,
  }
);

const Users = model("users", userSchema);

export default Users;
