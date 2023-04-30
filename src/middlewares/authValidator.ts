import { NextFunction, Response } from "express";
import { validateToken } from "../utils/jwt";
import { Request } from "../types";

export default async function authValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // console.log(req.cookies.access_token);
    const token =
      req.cookies.access_token || req.headers["authorization"]?.split(" ")[1]!;

    if (!token) res.status(400).json(null);
    else {
      const { data, isValid } = await validateToken(token);

      if (isValid) {
        req.user = { _id: data._id, role: data.role };
        next();
      } else res.status(400).json(null);
    }
  } catch (error) {
    res.clearCookie("access_token");
    res.status(401).json(null);

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

    if (!token) res.status(400).json(null);
    else {
      const { data, isValid } = await validateToken(token);

      if (isValid) {
        req.user = { _id: data._id };
        next();
      } else res.status(400).json(null);
    }
  } catch (error) {
    res.clearCookie("reset_token");
    res.status(401).json(null);

    // throw error;
  }
}
