import { NextFunction, Response } from "express";
import { Request } from "../types";
import { roles } from "../roles";

export default async function roleValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    switch (req.user?.role) {
      case roles.admin:
        return res.status(403).json(null);

      default:
        // maybe additional properties can be set
        // such as other allowed permissions
        next();
    }
  } catch (error) {
    res.status(403).json(null);
  }
}
