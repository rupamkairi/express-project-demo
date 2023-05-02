import { NextFunction, Response } from "express";
import { Request } from "../types";
import { roles } from "../roles";

export async function rolesValidator(...roles: roles[]) {
  return function (req: Request, res: Response, next: NextFunction) {};
}

export function scopeValidator(validator: any) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await validator(req, res);
      next();
    } catch (error) {
      res.status(500).json(error);
    }
  };
}
