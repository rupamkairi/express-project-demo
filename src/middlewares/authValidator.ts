import { NextFunction, Response } from "express";
import { validateToken } from "../utils/jwt";
import { Request } from "../types";
import { authErrors } from "../constants/errors";

export default async function authValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token =
      req.cookies.access_token || req.headers["authorization"]?.split(" ")[1]!;

    if (!token) res.status(401).json(authErrors.unauthorized());
    else {
      const { data, isValid } = await validateToken(token);

      if (isValid) {
        req.user = { _id: data._id, roles: data.roles };
        next();
      } else res.status(401).json(authErrors.unauthorized());
    }
  } catch (error) {
    console.log(error);
    res.clearCookie("access_token");
    res.status(401).json(authErrors.unauthorized());

    // throw error;
  }
}

export async function resetValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token =
      req.cookies.reset_token || req.headers["authorization"]?.split(" ")[1]!;

    if (!token) res.status(401).json(authErrors.unauthorized());
    else {
      const { data, isValid } = await validateToken(token);

      if (isValid) {
        req.user = { _id: data._id };
        next();
      } else res.status(401).json(authErrors.unauthorized());
    }
  } catch (error) {
    res.clearCookie("reset_token");
    res.status(401).json(authErrors.unauthorized());

    // throw error;
  }
}
