import { JwtPayload } from "jsonwebtoken";

export type jwtPayload = JwtPayload & {
  _id: string;
  role: string;
};

export enum jwtPurposeEnum {
  auth = "AUTH",
  reset = "RESET",
  refresh = "REFRESH",
}
