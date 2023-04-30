import { JwtPayload } from "jsonwebtoken";

export type jwtPayload = JwtPayload & {
  _id: string;
};

export enum jwtPurposeEnum {
  auth = "AUTH",
  reset = "RESET",
  refresh = "REFRESH",
}
