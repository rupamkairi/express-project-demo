import { JwtPayload } from "jsonwebtoken";
import { Schema } from "mongoose";
import { roles } from "../roles";

export type jwtPayload = JwtPayload & {
  _id: Schema.Types.ObjectId;
  roles: roles[];
};

export enum jwtPurposeEnum {
  auth = "AUTH",
  reset = "RESET",
  refresh = "REFRESH",
}
